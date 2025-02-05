import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class BrandService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // GET /brand - Get a list of all brand
  async findAll() {
    const { data, error } = await this.supabaseClient
      .from('brand_details_view')
      .select(
        'brand_id, brand_name, brand_background_image, brand_image, brand_country, brand_tags, total_contributions, total_contributed_amount',
      );

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // GET /brand/:id - Get details of a specific brand
  async findOne(id: string) {
    const { data, error } = await this.supabaseClient
      .from('brand_details_view')
      .select('*')
      .eq('brand_id', id)
      .single();

    if (error) {
      throw new NotFoundException('Brand not found');
    }

    return data;
  }

  async initiateCreating(
    createBrandDto: CreateBrandDto & { owner_id: string },
  ) {
    // Step 1: Insert the brand and get its ID
    const { data, error } = await this.supabaseClient
      .from('brand')
      .insert({
        brand_name: createBrandDto.brand_name,
        about_brand: createBrandDto.about_brand,
        brand_country: createBrandDto.brand_country,
        owner_id: createBrandDto.owner_id,
      })
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }
    const brandId = data.brand_id;

    // Step 2: Handle brand tags
    if (createBrandDto.brand_tags && createBrandDto.brand_tags.length > 0) {
      const brandTagData = createBrandDto.brand_tags.map((tag) => ({
        brand_id: brandId, // Now we correctly assign brand_id here
        tag_name: tag.tag_name,
      }));

      const { error: brandTagError } = await this.supabaseClient
        .from('brand_tag')
        .insert(brandTagData);

      if (brandTagError) throw new Error(brandTagError.message);
    }

    // Step 3: Handle social media
    if (createBrandDto.social_media && createBrandDto.social_media.length > 0) {
      const socialMediaData = createBrandDto.social_media.map(
        ({ name, link }) => ({
          brand_id: brandId, // Assign correct brand_id
          name,
          link,
        }),
      );

      const { error: socialMediaError } = await this.supabaseClient
        .from('social_media')
        .insert(socialMediaData);

      if (socialMediaError) throw new Error(socialMediaError.message);
    }

    return {
      message: 'Brand created successfully',
      brand_id: data.brand_id,
    };
  }

  // PUT /brand/:id - Update a specific brand
  async update(id: string, updateBrandDto: UpdateBrandDto) {
    const { data, error } = await this.supabaseClient
      .from('brand')
      .update([
        {
          brand_name: updateBrandDto.brand_name,
          brand_image: updateBrandDto.brand_image,
          brand_background_image: updateBrandDto.brand_background_image,
          about_brand: updateBrandDto.about_brand,
          brand_country: updateBrandDto.brand_country,
        },
      ])
      .eq('brand_id', id);

    if (error) {
      throw new NotFoundException('Brand not found or update failed');
    }
    return data ?? { message: 'Brand updated successfully' };
  }

  // DELETE /brand/:id - Delete a specific brand
  async delete(id: string) {
    const { error } = await this.supabaseClient
      .from('brand')
      .delete()
      .eq('brand_id', id);

    if (error) {
      throw new NotFoundException('Brand not found or delete failed');
    }

    return { message: 'Brand deleted successfully' };
  }
}
