import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateBrandTagDto } from './dto/create-brand-tag.dto';
import { UpdateBrandTagDto } from './dto/update-brand-tag.dto';

@Injectable()
export class BrandTagService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // GET /brand-tags/:brandId - Get all tags for a brand
  async getBrandTags(brand_id: string) {
    const { data, error } = await this.supabaseClient
      .from('brand_tag')
      .select('*')
      .eq('brand_id', brand_id);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // POST /brand-tags/:brandId - Create tag(s) for a brand
  async createBrandTag(brandId, createBrandTagDto: CreateBrandTagDto[]) {
    const brandTagData = createBrandTagDto.map((tag) => ({
      brand_id: brandId,
      tag_name: tag,
    }));

    const { data, error } = await this.supabaseClient
      .from('brand_tag')
      .insert(brandTagData);

    if (error) {
      throw new Error(error.message);
    }

    return data ?? { message: 'Tag(s) created successfully' };
  }

  // PATCH /brand-tags/:tagId - Update a tag
  async updateBrandTag(tagId: string, updateBrandTagDto: UpdateBrandTagDto) {
    const { data, error } = await this.supabaseClient
      .from('brand_tag')
      .update(updateBrandTagDto)
      .eq('tag_id', tagId);

    if (error) {
      throw new Error(error.message);
    }

    return data ?? { message: 'Tag updated successfully' };
  }

  // DELETE /brand-tags/:tagId - Delete a tag
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
