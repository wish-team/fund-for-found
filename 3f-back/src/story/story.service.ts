import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { createClient } from '../../utils/supabase/serever';

@Injectable()
export class StoryService {
  supabaseClient = createClient();
  
  async create(
    brandId: string,
    createStoryDto: CreateStoryDto,
  ): Promise<Story> {
    const { text, priority } = createStoryDto;
    return this.supabaseClient
      .from('STORY')
      .insert([{ BRAND_ID: brandId, TEXT: text, PRIORITY: priority }])
      .then((response) => response.data[0]);
  }

  async findByBrandId(brandId: string): Promise<Story[]> {
    return this.supabaseClient
      .from('STORY')
      .select('*')
      .eq('BRAND_ID', brandId)
      .then((response) => response.data);
  }

  update(id: number, updateStoryDto: UpdateStoryDto) {
    return `This action updates a #${id} story`;
  }

  remove(id: number) {
    return `This action removes a #${id} story`;
  }
}
