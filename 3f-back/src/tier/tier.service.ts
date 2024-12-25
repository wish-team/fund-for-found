import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateTierDto } from './dto/create-tier.dto'; // Assuming you have a DTO
import { UpdateTierDto } from './dto/update-tier.dto'; // Assuming you have a DTO

@Injectable()
export class TierService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // GET /tiers - Get a list of all tiers
  async findAll() {
    const { data, error } = await this.supabaseClient.from('tier').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // GET /tiers/:tier_id - Get details of a specific tier
  async findOne(tier_id: string) {
    const { data, error } = await this.supabaseClient
      .from('tier')
      .select('*')
      .eq('tier_id', tier_id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Tier not found');
    }

    return data;
  }

  // POST /tiers - Create a new tier
  async create(createTierDto: CreateTierDto & { brand_id: string }) {
    const { data, error } = await this.supabaseClient
      .from('tier')
      .insert([
        {
          brand_id: createTierDto.brand_id,
          name: createTierDto.name,
          description: createTierDto.description,
          amount: createTierDto.amount,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // PUT /tiers/:tier_id - Update a specific tier
  async update(tier_id: string, updateTierDto: UpdateTierDto) {
    const { data, error } = await this.supabaseClient
      .from('tier')
      .update({
        name: updateTierDto.name,
        description: updateTierDto.description,
        amount: updateTierDto.amount,
      })
      .eq('tier_id', tier_id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Tier not found or update failed');
    }

    return data;
  }

  // DELETE /tiers/:tier_id - Delete a specific tier
  async delete(tier_id: string) {
    const { data, error } = await this.supabaseClient
      .from('tier')
      .delete()
      .eq('tier_id', tier_id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Tier not found or delete failed');
    }

    return data;
  }
}
