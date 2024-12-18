import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateImpactDto } from './dto/create-impact.dto';
import { UpdateImpactDto } from './dto/update-impact.dto';

@Injectable()
export class ImpactService {
  constructor(private readonly supabaseClient: SupabaseClient) {}
  // Get all impacts for a specific brand
  async findAll(brandId: string) {
    const { data, error } = await this.supabaseClient
      .from('IMPACT') // Table name
      .select('*')
      .eq('BRAND_ID', brandId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Add a new impact for a specific brand
  async create(brandId: string, createImpactDto: CreateImpactDto) {
    const { data, error } = await this.supabaseClient
      .from('IMPACT') // Table name
      .insert([
        {
          BRAND_ID: brandId,
          TEXT: createImpactDto.text,
          PRIORITY: createImpactDto.priority,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Update a specific impact of a brand
  async update(
    brandId: string,
    text: string,
    updateImpactDto: UpdateImpactDto,
  ) {
    const { data, error } = await this.supabaseClient
      .from('IMPACT') // Table name
      .update({
        TEXT: updateImpactDto.text,
        PRIORITY: updateImpactDto.priority,
      })
      .eq('BRAND_ID', brandId)
      .eq('TEXT', text)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Impact not found or update failed');
    }

    return data;
  }

  // Delete a specific impact of a brand
  async delete(brandId: string, text: string) {
    const { error } = await this.supabaseClient
      .from('IMPACT') // Table name
      .delete()
      .eq('BRAND_ID', brandId)
      .eq('TEXT', text);

    if (error) {
      throw new NotFoundException('Impact not found or delete failed');
    }

    return { message: 'Impact deleted successfully' };
  }
}
