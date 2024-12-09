import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    // console.log('Supabase URL:', process.env.SUPABASE_URL);
    // console.log('Supabase Anon Key:', process.env.SUPABASE_ANON_KEY);

    this.client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
    );
  }

  getClient(): SupabaseClient {
    return this.client;
  }

  // Save a new wallet address
  async saveAddress(brandId: number, address: string): Promise<void> {
    const { data, error } = await this.client
      .from('wallet_addresses')
      .insert([{ brand_id: brandId, address }]);
    if (error) {
      throw new Error(`Failed to save address: ${error.message}`);
    }
  }

  // Get the wallet address for a specific brand
  async getAddress(brandId: number): Promise<string | null> {
    const { data, error } = await this.client
      .from('wallet_addresses')
      .select('address')
      .eq('brand_id', brandId)
      .single();

    if (error) {
      throw new Error(`Failed to fetch address: ${error.message}`);
    }

    return data ? data.address : null;
  }

  // Update the transaction status (e.g., received, pending, etc.)
  async updateTransactionStatus(
    walletId: number,
    status: string,
    amount: string,
  ): Promise<void> {
    const { data, error } = await this.client
      .from('transactions') // Assuming you have a 'transactions' table
      .update({
        status,
        amount, // Update the transaction amount
        updated_at: new Date().toISOString(), // Optionally, track when updated
      })
      .eq('wallet_id', walletId); // Assuming there's a 'wallet_id' column

    if (error) {
      throw new Error(`Failed to update transaction status: ${error.message}`);
    }
  }

  // Get all pending wallet addresses (e.g., where transaction status is 'pending')
  async getPendingAddresses(): Promise<
    { address: string; id: number; brandId: number }[]
  > {
    const { data, error } = await this.client
      .from('wallet_addresses')
      .select('address, id, brand_id') // Include brand_id in the select query
      .eq('status', 'pending'); // Assuming the 'status' field indicates pending transactions

    if (error) {
      throw new Error(`Failed to fetch pending addresses: ${error.message}`);
    }

    // Map the data to the correct structure
    return (
      data.map((item) => ({
        address: item.address,
        id: item.id,
        brandId: item.brand_id, // Map brand_id to brandId
      })) || []
    );
  }
  async logCommissionAndTransfer(
    address: string,
    brandAddress: string,
    commission: number,
    userAmount: number,
    transactionHash: string,
  ): Promise<void> {
    const { error } = await this.client.from('transaction_logs').insert([
      {
        address,
        brand_address: brandAddress,
        commission,
        user_amount: userAmount,
        transaction_hash: transactionHash,
      },
    ]);

    if (error) {
      throw new Error(
        `Failed to log commission and transfer: ${error.message}`,
      );
    }
  }
}
