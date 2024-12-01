import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { supabase } from '../../utils/supabase/client'; // Import Supabase client

@Injectable()
export class BrandsService {
  // GET /brands - Get a list of all brands
  async findAll() {
    const { data, error } = await supabase.from('BRAND').select('*');

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // GET /brands/:id - Get details of a specific brand
  async findOne(id: string) {
    const { data, error } = await supabase
      .from('BRAND')
      .select('*')
      .eq('BRAND_ID', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Brand not found');
    }

    return data;
  }

  // POST /brands - Create a new brand
  async create(createBrandDto: CreateBrandDto) {
    const { data, error } = await supabase
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
    const { data, error } = await supabase
      .from('BRAND')
      .update({
        BRAND_NAME: updateBrandDto.brand_name,
        BRAND_IMAGE: updateBrandDto.brand_image,
      })
      .eq('BRAND_ID', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Brand not found or update failed');
    }

    return data;
  }

  // DELETE /brands/:id - Delete a specific brand
  async delete(id: string) {
    const { data, error } = await supabase
      .from('BRAND')
      .delete()
      .eq('BRAND_ID', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Brand not found or delete failed');
    }

    return data;
  }
}
