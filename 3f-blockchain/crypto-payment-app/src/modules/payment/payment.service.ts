import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ethers } from 'ethers';
import { AddressService } from 'src/modules/address/address.service';
import { SupabaseService } from 'src/modules/supabase/supabase.service';

@Injectable()
export class PaymentService {
  private commissionPercentage = 10; // 10% commission
  private provider: ethers.JsonRpcProvider;
  private commissionWallet: ethers.Wallet;
  private brandWallet: string;

  constructor(
    private addressService: AddressService,
    private supabaseService: SupabaseService,
  ) {
    if (!process.env.BLOCKCHAIN_RPC_URL) {
      throw new Error('BLOCKCHAIN_RPC_URL is not defined');
    }
    if (!process.env.COMMISSION_PRIVATE_KEY) {
      throw new Error('COMMISSION_PRIVATE_KEY is not defined');
    }
    if (!process.env.BRAND_WALLET_ADDRESS) {
      throw new Error('BRAND_WALLET_ADDRESS is not defined');
    }

    this.provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
    this.brandWallet = process.env.BRAND_WALLET_ADDRESS;
    this.commissionWallet = new ethers.Wallet(
      process.env.COMMISSION_PRIVATE_KEY,
      this.provider,
    );
    console.log('Brand Wallet Address:', this.brandWallet);
  }

  async initiatePayment(
    network: string,
    brandId: number,
    uniqueIndex: number,
    token: string,
  ) {
    const supabase = this.supabaseService.getClient();

    const { data: existingRecords, error: selectError } = await supabase
      .from('transactions')
      .select('id, generated_address, generated_private_key')
      .eq('brand_id', brandId)
      .eq('coin_type', token)
      .eq('network', network)
      .eq('unique_index', uniqueIndex)
      .limit(1)
      .maybeSingle();

    if (selectError) {
      throw new HttpException(
        'Database error: ' + selectError.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (existingRecords) {
      return {
        success: true,
        derivedAddress: existingRecords.generated_address,
        message: 'Payment initiation successful (existing address)',
      };
    }

    const { derivedAddress, derivedPrivateKey } =
      await this.addressService.generateDerivedAddress(token, uniqueIndex);

    const { error } = await supabase
      .from('transactions')
      .insert({
        unique_index: uniqueIndex,
        brand_id: brandId,
        generated_address: derivedAddress,
        generated_private_key: derivedPrivateKey,
        coin_type: token,
        network: network,
        status: 'pending',
      })
      .single();

    if (error) {
      throw new HttpException(
        'Database error: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      success: true,
      derivedAddress,
      message: 'Payment initiation successful',
    };
  }

  async processPayment(receivedTransactionHash: string) {
    const tx = await this.provider.getTransaction(receivedTransactionHash);
    if (!tx || !tx.to) {
      throw new HttpException(
        'Transaction not found or invalid',
        HttpStatus.NOT_FOUND,
      );
    }

    const txReceipt = await this.provider.getTransactionReceipt(
      receivedTransactionHash,
    );
    if (!txReceipt) {
      throw new HttpException(
        'Transaction receipt not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    const receivedAmount = parseFloat(ethers.formatEther(tx.value));
    console.log('receivedAmount', receivedAmount);

    const commissionAmount = (receivedAmount * this.commissionPercentage) / 100;
    const brandAmount = receivedAmount - commissionAmount;
    console.log('Brand Amount:', brandAmount);

    const supabase = this.supabaseService.getClient();
    
    console.log('Looking for transaction with address:', tx.to);
    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*, brands(brand_wallet_address)')
      .filter('generated_address', 'ilike', tx.to)
      .eq('status', 'pending')
      .single();

    if (error || !transaction) {
      console.log('Error finding transaction:', error);
      console.log('Looking for address:', tx.to);
      throw new HttpException(
        'No matching transaction found',
        HttpStatus.NOT_FOUND,
      );
    }

    console.log('Found transaction:', transaction);

    if (transaction.status === 'processed') {
      throw new HttpException(
        'Transaction already processed',
        HttpStatus.BAD_REQUEST,
      );
    }

    // First update the transaction with initial details
    const { error: updateError1 } = await supabase
      .from('transactions')
      .update({
        received_transaction_hash: receivedTransactionHash,
        received_amount: receivedAmount,
        commission_amount: commissionAmount,
        brand_amount: brandAmount,
        status: 'processing'
      })
      .eq('id', transaction.id);

    if (updateError1) {
      console.error('Failed to update initial transaction details:', updateError1);
      throw new HttpException(
        `Failed to update transaction: ${updateError1.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    console.log('Updated initial transaction details');

    // Transfer to commission wallet with optimized gas
    let transferTxHash;
    try {
      console.log('Starting transfer to commission wallet...');
      transferTxHash = await this.addressService.monitorAndTransferFunds(
        receivedTransactionHash,
        transaction.generated_private_key,
        this.commissionWallet,
      );

      console.log('Waiting for commission transfer confirmation...');
      await this.provider.waitForTransaction(transferTxHash, 1);
      console.log('Commission transfer confirmed:', transferTxHash);
    } catch (error: any) {
      console.error('Commission transfer error:', error);
      throw new HttpException(
        `Failed to transfer to commission wallet: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Transfer to brand wallet with optimized gas
    let brandTxHash;
    try {
      console.log('Starting transfer to brand wallet...');
      const brandAmountWei = ethers.parseEther(brandAmount.toString());
      const feeData = await this.provider.getFeeData();
      const gasPrice = feeData.gasPrice ?? 
        (feeData.maxFeePerGas ? feeData.maxFeePerGas / 2n : 
        ethers.parseUnits('20', 'gwei'));

      const brandTx = await this.commissionWallet.sendTransaction({
        to: this.brandWallet,
        value: brandAmountWei,
        gasLimit: 21000n,
        maxFeePerGas: gasPrice,
        type: 2,
      });

      brandTxHash = brandTx.hash;
      console.log('Waiting for brand transfer confirmation...');
      await brandTx.wait(1);
      console.log('Brand transfer confirmed:', brandTxHash);
    } catch (error: any) {
      console.error('Brand transfer error:', error);
      throw new HttpException(
        `Failed to transfer to brand wallet: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Update final transaction status
    const { error: updateError2 } = await supabase
      .from('transactions')
      .update({
        outgoing_transaction_hash: brandTxHash,
        status: 'processed',
      })
      .eq('id', transaction.id);

    if (updateError2) {
      console.error('Failed to update final transaction status:', updateError2);
      throw new HttpException(
        `Failed to update transaction: ${updateError2.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    console.log('Transaction fully processed and updated');

    return {
      success: true,
      message: 'Payment processed successfully',
      receivedTransactionHash,
      transferTransactionHash: transferTxHash,
      brandTransactionHash: brandTxHash,
      commissionAmount,
      brandAmount,
    };
  }
}