import { Injectable, NotFoundException } from '@nestjs/common';
import { supabase } from '../../utils/supabase/client'; // Import your Supabase client
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
  // Get all FAQs for a specific brand
  async findAll(brandId: string) {
    const { data, error } = await supabase
      .from('FAQ') // Table name
      .select('*')
      .eq('BRAND_ID', brandId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Add a new FAQ for a specific brand
  async create(brandId: string, createFaqDto: CreateFaqDto) {
    const { data, error } = await supabase
      .from('FAQ') // Table name
      .insert([
        {
          BRAND_ID: brandId,
          TEXT: createFaqDto.text,
          PRIORITY: createFaqDto.priority,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Update a specific FAQ of a brand
  async update(brandId: string, text: string, updateFaqDto: UpdateFaqDto) {
    const { data, error } = await supabase
      .from('FAQ') // Table name
      .update({
        TEXT: updateFaqDto.text,
        PRIORITY: updateFaqDto.priority,
      })
      .eq('BRAND_ID', brandId)
      .eq('TEXT', text)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('FAQ not found or update failed');
    }

    return data;
  }

  // Delete a specific FAQ of a brand
  async delete(brandId: string, text: string) {
    const { error } = await supabase
      .from('FAQ') // Table name
      .delete()
      .eq('BRAND_ID', brandId)
      .eq('TEXT', text);

    if (error) {
      throw new NotFoundException('FAQ not found or delete failed');
    }

    return { message: 'FAQ deleted successfully' };
  }
}
