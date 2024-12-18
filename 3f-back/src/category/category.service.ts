import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly supabaseClient: SupabaseClient) {}
  // Get all categories for a specific brand
  async findAll(brandId: string) {
    const { data, error } = await this.supabaseClient
      .from('CATEGORY') // Updated table name
      .select('*')
      .eq('BRAND_ID', brandId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Create a new category for a brand
  async create(brandId: string, createCategoryDto: CreateCategoryDto) {
    const { data, error } = await this.supabaseClient
      .from('CATEGORY') // Updated table name
      .insert([
        {
          BRAND_ID: brandId,
          CATEGORY_NAME: createCategoryDto.category_name,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Update a specific category
  async update(
    brandId: string,
    categoryName: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    const { data, error } = await this.supabaseClient
      .from('CATEGORY') // Updated table name
      .update({
        CATEGORY_NAME: updateCategoryDto.category_name,
      })
      .eq('BRAND_ID', brandId)
      .eq('CATEGORY_NAME', categoryName)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Category not found or update failed');
    }

    return data;
  }

  // Delete a specific category
  async delete(brandId: string, categoryName: string) {
    const { error } = await this.supabaseClient
      .from('CATEGORY') // Updated table name
      .delete()
      .eq('BRAND_ID', brandId)
      .eq('CATEGORY_NAME', categoryName);

    if (error) {
      throw new NotFoundException('Category not found or delete failed');
    }

    return { message: 'Category deleted successfully' };
  }
}
