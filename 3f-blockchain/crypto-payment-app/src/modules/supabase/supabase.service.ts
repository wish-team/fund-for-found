import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    this.client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
    );
  }

  getClient(): SupabaseClient {
    return this.client;
  }

  async saveAddress(brandId: number, address: string): Promise<void> {
    const { data, error } = await this.client
      .from('wallet_addresses')
      .insert([{ brand_id: brandId, address }]);
    if (error) {
      throw new Error(`Failed to save address: ${error.message}`);
    }
  }

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
}
