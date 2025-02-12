import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateTierDto } from './dto/create-tier.dto'; // Assuming you have a DTO
import { UpdateTierDto } from './dto/update-tier.dto'; // Assuming you have a DTO

@Injectable()
export class TierService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // GET /tier/:brandId - Get all tiers for a specific brand
  async findAll(brandId: string) {
    const { data, error } = await this.supabaseClient
      .from('tier')
      .select('*')
      .eq('brand_id', brandId);
    if (error || !data) {
      throw new NotFoundException('Tier not found');
    }

    return data;
  }

  // POST /tier/:brandId - Create a new tier
  async create(brandId: string, createTierDto: CreateTierDto) {
    const { data, error } = await this.supabaseClient.from('tier').insert([
      {
        brand_id: brandId,
        name: createTierDto.name,
        description: createTierDto.description,
        amount: createTierDto.amount,
        tier_image: createTierDto.tier_image,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // PATCH /tier/:tierId - Update a specific tier
  async update(tierId: string, updateTierDto: UpdateTierDto) {
    const { data, error } = await this.supabaseClient
      .from('tier')
      .update({
        name: updateTierDto.name,
        description: updateTierDto.description,
        amount: updateTierDto.amount,
        tier_image: updateTierDto.tier_image,
      })
      .eq('tier_id', tierId)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Tier not found or update failed');
    }

    return data ?? { "it's updated": true };
  }

  // DELETE /tier/:tierId - Delete a specific tier
  async delete(tierId: string) {
    const { data, error } = await this.supabaseClient
      .from('tier')
      .delete()
      .eq('tier_id', tierId)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Tier not found or delete failed');
    }

    return data;
  }
}
