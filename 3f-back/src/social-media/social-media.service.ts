import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';

@Injectable()
export class SocialMediaService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // GET /social-media - Get all social media links
  async findAll() {
    const { data, error } = await this.supabaseClient
      .from('social_media')
      .select('*');
    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  // GET /social-media/:id - Get a specific social media link by ID
  async findOne(id: string) {
    const { data, error } = await this.supabaseClient
      .from('social_media')
      .select('*')
      .eq('brand_id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException('Social media not found');
    }

    return data;
  }

  // POST /social-media - Create a new social media link
  async create(
    createSocialMediaDto: CreateSocialMediaDto & { brand_id: string },
  ) {
    const { data, error } = await this.supabaseClient
      .from('social_media')
      .insert([
        {
          brand_id: createSocialMediaDto.brand_id,
          name: createSocialMediaDto.name,
          link: createSocialMediaDto.link,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // PUT /social-media/:id - Update a specific social media link
  async update(id: string, updateSocialMediaDto: UpdateSocialMediaDto) {
    const { data, error } = await this.supabaseClient
      .from('social_media')
      .update({
        name: updateSocialMediaDto.name,
        link: updateSocialMediaDto.link,
      })
      .eq('brand_id', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Social media not found or update failed');
    }

    return data;
  }

  // DELETE /social-media/:id - Delete a specific social media link
  async delete(id: string) {
    const { data, error } = await this.supabaseClient
      .from('social_media')
      .delete()
      .eq('brand_id', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Social media not found or delete failed');
    }

    return data;
  }
}
