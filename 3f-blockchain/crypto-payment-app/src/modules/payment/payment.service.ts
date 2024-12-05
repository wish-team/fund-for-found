import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ethers } from 'ethers';
import { AddressService } from 'src/modules/address/address.service';
import { SupabaseService } from 'src/modules/supabase/supabase.service';

@Injectable()
export class PaymentService {
  private commissionPercentage = 10; // 10% commission
  private provider: ethers.JsonRpcProvider;
  private masterWallet: ethers.Wallet;

  constructor(
    private addressService: AddressService,
    private supabaseService: SupabaseService,
  ) {
    this.provider = new ethers.JsonRpcProvider(
      'https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID',
    );
    this.masterWallet = new ethers.Wallet(
      'YOUR_MASTER_PRIVATE_KEY',
      this.provider,
    );
  }

  async initiatePayment(brandId: number, uniqueIndex: number) {
    const supabase = this.supabaseService.getClient();

    // Generate unique address for this transaction
    const generatedAddress =
      this.addressService.generateUniqueAddress(uniqueIndex);

    // Save transaction in Supabase
    const { data, error } = await supabase.from('transactions').insert({
      unique_index: uniqueIndex,
      brand_id: brandId,
      generated_address: generatedAddress,
    });

    if (error) {
      throw new HttpException(
        'Database error: ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return {
      success: true,
      generatedAddress,
      message: 'Payment initiation successful',
    };
  }

  async processPayment(receivedTransactionHash: string) {
    const supabase = this.supabaseService.getClient();

    // Fetch transaction details
    const tx = await this.provider.getTransaction(receivedTransactionHash);
    if (!tx) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }

    // Retrieve the matching transaction from Supabase
    const { data: transaction, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('generated_address', tx.to)
      .single();

    if (error || !transaction) {
      throw new HttpException(
        'No matching transaction found',
        HttpStatus.NOT_FOUND,
      );
    }

    const receivedAmount = parseFloat(ethers.formatEther(tx.value));

    // Calculate commission and brand amount
    const commissionAmount = (receivedAmount * this.commissionPercentage) / 100;
    const brandAmount = receivedAmount - commissionAmount;

    // Send remaining funds to the brand
    const brandTransaction = await this.masterWallet.sendTransaction({
      to: transaction.brand_wallet_address,
      value: ethers.parseEther(brandAmount.toString()),
    });

    // Update Supabase with processed details
    await supabase
      .from('transactions')
      .update({
        received_transaction_hash: receivedTransactionHash,
        received_amount: receivedAmount,
        commission_amount: commissionAmount,
        brand_amount: brandAmount,
        outgoing_transaction_hash: brandTransaction.hash,
      })
      .eq('id', transaction.id);

    return {
      success: true,
      message: 'Payment processed successfully',
      brandTransactionHash: brandTransaction.hash,
    };
  }
}
