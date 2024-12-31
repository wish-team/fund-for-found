import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class BrandService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // GET /brand - Get a list of all brand
  async findAll() {
    const { data, error } = await this.supabaseClient.from('brand').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // GET /brand/:id - Get details of a specific brand
  async findOne(id: string) {
    const { data, error } = await this.supabaseClient
      .from('brand')
      .select()
      .eq('brand_id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Brand not found');
    }

    return data;
  }

  async create(createBrandDto: CreateBrandDto & { owner_id: string }) {
    const { data, error } = await this.supabaseClient.from('brand').insert({
      owner_id: createBrandDto.owner_id,
      brand_name: createBrandDto.brand_name,
      brand_image: createBrandDto.brand_image,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data ?? { message: 'Brand createed successfully ' };
  }

  // PUT /brand/:id - Update a specific brand
  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const { data, error } = await this.supabaseClient
      .from('brand')
      .update([
        {
          brand_name: updateBrandDto.brand_name,
          brand_image: updateBrandDto.brand_image,
        },
      ])
      .eq('brand_id', id);

    if (error || !data) {
      throw new NotFoundException('Brand not found or update failed');
    }
    return 'data';
  }

  // DELETE /brand/:id - Delete a specific brand
  async delete(id: string) {
    const { data, error } = await this.supabaseClient
      .from('brand')
      .delete()
      .eq('owner-id', id);

    if (error || !data) {
      throw new NotFoundException('Brand not found or delete failed');
    }

    return data;
  }
}
