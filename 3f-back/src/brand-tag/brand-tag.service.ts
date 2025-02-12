import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateBrandTagDto } from './dto/create-brand-tag.dto';
import { UpdateBrandTagDto } from './dto/update-brand-tag.dto';

@Injectable()
export class BrandTagService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // GET /brand-tags/:brandId
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

  // POST /brand-tags/:brandId
  async createBrandTag(brandId, createBrandTagDto: CreateBrandTagDto) {
    const { data, error } = await this.supabaseClient.from('brand_tag').insert({
      brand_id: brandId,
      tag_name: createBrandTagDto.tag_name,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
  // PATCH /brand-tags/:tagId
  async updateBrandTag(tagId: string, updateBrandTagDto: UpdateBrandTagDto) {
    const { data, error } = await this.supabaseClient
      .from('brand_tag')
      .update(updateBrandTagDto)
      .eq('tag_id', tagId)
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
  // DELETE /brand-tags/:tagId
  async deleteBrandTag(tagId: string) {
    const { error } = await this.supabaseClient
      .from('brand_tag')
      .delete()
      .eq('tag_id', tagId);

    if (error) {
      throw new Error(error.message);
    }

    return { message: 'Brand tag deleted successfully' };
  }
}
