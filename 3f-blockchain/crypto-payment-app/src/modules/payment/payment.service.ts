import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ethers } from 'ethers';
import { AddressService } from 'src/modules/address/address.service';
import { SupabaseService } from 'src/modules/supabase/supabase.service';

@Injectable()
export class PaymentService {
  private commissionPercentage = 10; // 10% commission
  private provider: ethers.JsonRpcProvider;
  private commissionWallet: ethers.Wallet;
  private brandWallet;

  constructor(
    private addressService: AddressService,
    private supabaseService: SupabaseService,
  ) {
    this.provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);
    this.brandWallet = process.env.BRAND_WALLET_ADDRESS;

    const commissionPrivateKey = process.env.COMMISSION_PRIVATE_KEY;
    if (!commissionPrivateKey || typeof commissionPrivateKey !== 'string') {
      throw new Error('COMMISSION_PRIVATE_KEY is not defined or invalid');
    }
    this.commissionWallet = new ethers.Wallet(
      commissionPrivateKey,
      this.provider,
    );
    console.log(
      'Commission Wallet Initialized:',
      this.commissionWallet.address,
    );
  }

  async initiatePayment(
    brandId: number,
    uniqueIndex: number,
    coin: string, // Accept coin type from the user
  ) {
    const supabase = this.supabaseService.getClient();

    // Generate unique address
    const { derivedAddress, derivedPrivateKey } =
      await this.addressService.generateDerivedAddress(coin, uniqueIndex);

    // Save transaction in Supabase
    const { data, error } = await supabase.from('transactions').insert({
      unique_index: uniqueIndex,
      brand_id: brandId,
      generated_address: derivedAddress,
      generated_private_key: derivedPrivateKey,
      coin_type: coin, // Store the coin type
      network: 'sepolia',
    });

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
    const supabase = this.supabaseService.getClient();

    // Fetch transaction details from blockchain
    const tx = await this.provider.getTransaction(receivedTransactionHash);
    console.log('Transaction:', tx);
    if (!tx || !tx.to) {
      throw new HttpException(
        'Transaction not found or invalid',
        HttpStatus.NOT_FOUND,
      );
    }

    // Get the transaction receipt
    const txReceipt = await this.provider.getTransactionReceipt(
      receivedTransactionHash,
    );
    if (!txReceipt) {
      throw new HttpException(
        'Transaction receipt not found',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Get the current block number and calculate confirmations
    const currentBlockNumber = await this.provider.getBlockNumber();
    const confirmations = currentBlockNumber - txReceipt.blockNumber + 1; // Adding 1 for the initial confirmation

    if (confirmations < 1) {
      throw new HttpException(
        'Transaction not confirmed yet',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Retrieve the matching transaction from Supabase and join with the brands table
    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*, brands(brand_wallet_address), generated_private_key') // Ensure generated_private_key is selected
      .eq('generated_address', tx.to)
      .single();

    if (error || !transaction) {
      throw new HttpException(
        'No matching transaction found',
        HttpStatus.NOT_FOUND,
      );
    }

    // Ensure we are retrieving the brand wallet address correctly
    const brandWalletAddress = transaction.brands?.brand_wallet_address;
    console.log('Brand Wallet Address:', brandWalletAddress);
    if (transaction.status === 'processed') {
      throw new HttpException(
        'Transaction already processed',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!brandWalletAddress || !ethers.isAddress(brandWalletAddress)) {
      throw new HttpException(
        'Invalid brand wallet address',
        HttpStatus.BAD_REQUEST,
      );
    }

    const receivedAmount = parseFloat(ethers.formatEther(tx.value));
    console.log('receivedAmount', receivedAmount);
    if (receivedAmount <= 0) {
      throw new HttpException(
        'Transaction amount is zero or invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Calculate commission and brand amount
    const commissionAmount = (receivedAmount * this.commissionPercentage) / 100;
    const brandAmount = receivedAmount - commissionAmount;
    console.log('Brand Amount:', brandAmount);
    console.log('Brand Wallet Address:', brandWalletAddress);

    // Ensure the brandAmount has correct precision (18 decimals)
    const brandAmountFormatted = ethers.parseUnits(brandAmount.toFixed(18), 18);

    const mnemonic = process.env.MASTER_MNEMONIC;

    if (!mnemonic || typeof mnemonic !== 'string') {
      throw new Error('Invalid mnemonic');
    }

    // Create wallet from mnemonic (without HDNodeWallet)
    const wallet = ethers.Wallet.fromPhrase(mnemonic).connect(this.provider);

    // Retrieve derivedPrivateKey from the transaction record
    const derivedPrivateKey = transaction.generated_private_key;
    if (!derivedPrivateKey) {
      throw new HttpException(
        'Derived private key not found in transaction',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Use the AddressService to monitor the derived address and transfer funds to the main wallet
    const transferTransactionHash =
      await this.addressService.monitorAndTransferFunds(
        receivedTransactionHash,
        derivedPrivateKey,
        this.commissionWallet,
      );

    // Send remaining funds to the brand
    let brandTransaction;
    let derivedWallet: ethers.Wallet;

    try {
      const commissionBalance = await this.provider.getBalance(
        this.commissionWallet.address,
      );
      // const masterBalance = await this.provider.getBalance(
      //   this.masterWallet.address,
      // );
      // 2. Calculate gas cost
      const feeData = await this.provider.getFeeData();
      const gasPrice = feeData.gasPrice;
      if (!gasPrice) throw new Error('Gas price unavailable');

      const gasLimit = 21000n; // Standard ETH transfer
      const gasCost = gasLimit * gasPrice;
      if (commissionBalance < gasCost + brandAmountFormatted) {
        throw new Error(
          `Master wallet balance too low. Balance: ${ethers.formatEther(commissionBalance)} ETH, Needed: ${ethers.formatEther(gasCost + brandAmountFormatted)} ETH`,
        );
      }

      derivedWallet = new ethers.Wallet(derivedPrivateKey, this.provider);

      brandTransaction = await derivedWallet.sendTransaction({
        to: this.brandWallet,
        value: brandAmountFormatted, // Use the properly formatted amount
      });
    } catch (error: any) {
      throw new HttpException(
        `Error sending funds to brand: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    // Update Supabase with processed details
    const { error: updateError } = await supabase
      .from('transactions')
      .update({
        received_transaction_hash: receivedTransactionHash,
        received_amount: receivedAmount,
        commission_amount: commissionAmount,
        brand_amount: brandAmount,
        outgoing_transaction_hash: brandTransaction.hash,
        status: 'processed',
      })
      .eq('id', transaction.id);

    if (updateError) {
      throw new HttpException(
        `Failed to update transaction: ${updateError.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      success: true,
      message: 'Payment processed successfully',
      receivedTransactionHash,
      brandTransactionHash: brandTransaction.hash,
      commissionAmount,
      brandAmount,
      transferTransactionHash,
    };
  }
}
