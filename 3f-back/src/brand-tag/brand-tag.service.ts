import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateBrandTagDto } from './dto/create-brand-tag.dto';
import { UpdateBrandTagDto } from './dto/update-brand-tag.dto';

@Injectable()
export class BrandTagService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  async createBrandTag(createBrandTagDto: CreateBrandTagDto) {
    const { data, error } = await this.supabaseClient
      .from('brand_tag')
      .insert(createBrandTagDto)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async getTagsByBrand(brand_id: string) {
    const { data, error } = await this.supabaseClient
      .from('brand_tag')
      .select('*')
      .eq('brand_id', brand_id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async updateBrandTag(id: string, updateBrandTagDto: UpdateBrandTagDto) {
    const { data, error } = await this.supabaseClient
      .from('brand_tag')
      .update(updateBrandTagDto)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async deleteBrandTag(id: string) {
    const { error } = await this.supabaseClient
      .from('brand_tag')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(error.message);
    }

    return { message: 'Brand tag deleted successfully' };
  }
}
