import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class BrandsService {
  constructor(private readonly supabaseClient: SupabaseClient) {}
  // GET /brands - Get a list of all brands
  async findAll() {
    const { data, error } = await this.supabaseClient.from('BRAND').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // GET /brands/:id - Get details of a specific brand
  async findOne(id: string) {
    const { data, error } = await this.supabaseClient
      .from('BRAND')
      .select('*')
      .eq('BRAND_ID', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Brand not found');
    }

    return data;
  }

  async create(createBrandDto: CreateBrandDto & { owner_id: string }) {
    const { data, error } = await this.supabaseClient
      .from('BRAND')
      .insert([
        {
          OWNER_ID: createBrandDto.owner_id,
          BRAND_NAME: createBrandDto.brand_name,
          BRAND_IMAGE: createBrandDto.brand_image,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // PUT /brands/:id - Update a specific brand
  async update(id: string, updateBrandDto: UpdateBrandDto) {
    // Try to update the brand
    const { data, error } = await this.supabaseClient
      .from('BRAND')
      .update({
        BRAND_NAME: updateBrandDto.brand_name,
        BRAND_IMAGE: updateBrandDto.brand_image,
      })
      .eq('BRAND_ID', id)
      .select()
      .single();

    // Check for any error or if no data was updated (brand not found)
    if (error || !data) {
      throw new NotFoundException('Brand not found or update failed');
    }

    return data;
  }

  // DELETE /brands/:id - Delete a specific brand
  async delete(id: string) {
    // Try to delete the brand
    const { data, error } = await this.supabaseClient
      .from('BRAND')
      .delete()
      .eq('BRAND_ID', id)
      .select()
      .single();

    // Check for any error or if no data was deleted (brand not found)
    if (error || !data) {
      throw new NotFoundException('Brand not found or delete failed');
    }

    return data;
  }
}
