import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';
import { InjectSupabaseClient } from 'nestjs-supabase-js';

@Injectable()
export class SocialMediaService {
  constructor(
    @InjectSupabaseClient('connection1')
    private readonly supabaseClient: SupabaseClient,
  ) {}

  // GET /social-media/:brandId - Get a specific social media link by ID
  async findAllSocialMedia(brandId: string) {
    const { data, error } = await this.supabaseClient
      .from('social_media')
      .select('*')
      .eq('brand_id', brandId);

    if (error || !data) {
      throw new NotFoundException('Social media not found');
    }

    return data;
  }

  // POST /social-media/:brandId - Create a new social media link
  async createSocialMedia(
    brandId: string,
    createSocialMediaDto: CreateSocialMediaDto[],
  ) {
    const socialMediaData = createSocialMediaDto.map(({ name, link }) => ({
      brand_id: brandId,
      name,
      link,
    }));

    const { data, error } = await this.supabaseClient
      .from('social_media')
      .insert(socialMediaData);

    if (error) {
      throw new NotFoundException('Social media does not created');
    }

    return data ?? { message: 'Social media created successfully' };
  }

  // PUT /social-media/:brandId - Update a specific social media link
  async updateSocialMedia(
    smId: string,
    updateSocialMediaDto: UpdateSocialMediaDto,
  ) {
    const { data, error } = await this.supabaseClient
      .from('social_media')
      .update([
        {
          name: updateSocialMediaDto.name.toLowerCase(),
          link: updateSocialMediaDto.link.toLowerCase(),
        },
      ])
      .eq('social_media_id', smId);

    if (error) {
      throw new NotFoundException('Social media not found or update failed');
    }
    return data ?? { message: 'Social media updated successfully' };
  }

  // DELETE /social-media/:brandId - Delete a specific social media link
  async deleteSocialMedia(smId: string) {
    const { data, error } = await this.supabaseClient
      .from('social_media')
      .delete()
      .eq('social_media_id', smId);

    if (error) {
      throw new NotFoundException('Social media not found or delete failed');
    }

    return data ?? { message: 'Social media deleted successfully' };
  }
}
