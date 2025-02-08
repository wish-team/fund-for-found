import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';

@Injectable()
export class SocialMediaService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // GET /social-media/:id - Get a specific social media link by ID
  async findAll(id: string) {
    const { data, error } = await this.supabaseClient
      .from('social_media')
      .select('*')
      .eq('brand_id', id);

    if (error || !data) {
      throw new NotFoundException('Social media not found');
    }

    return data;
  }

  // POST /social-media/:id - Create a new social media link
  async create(id: string, createSocialMediaDto: CreateSocialMediaDto) {
    const { data, error } = await this.supabaseClient
      .from('social_media')
      .insert([
        {
          brand_id: id,
          name: createSocialMediaDto.name.toLowerCase(),
          link: createSocialMediaDto.link.toLowerCase(),
        },
      ]);

    if (error) {
      throw new NotFoundException('social media does not created');
    }

    return data ?? { message: 'Social media created successfully' };
  }

  // PUT /social-media/:id - Update a specific social media link
  async update(smId: string, updateSocialMediaDto: UpdateSocialMediaDto) {
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

  // DELETE /social-media/:id - Delete a specific social media link
  async delete(smId: string) {
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
