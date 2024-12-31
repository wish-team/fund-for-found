import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // Get all FAQs for a specific brand
  async findAll(brandId: string) {
    const { data, error } = await this.supabaseClient
      .from('faq')
      .select('*')
      .eq('brand_id', brandId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  // Add a new FAQ for a specific brand
  async create(brandId: string, createFaqDto: CreateFaqDto) {
    const { data, error } = await this.supabaseClient
      .from('faq')
      .insert([
        {
          brand_id: brandId,
          question: createFaqDto.question,
          answer: createFaqDto.answer,
          priority: createFaqDto.priority,
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
  async update(brandId: string, question: string, updateFaqDto: UpdateFaqDto) {
    const { data, error } = await this.supabaseClient
      .from('faq')
      .update({
        question: updateFaqDto.question,
        priority: updateFaqDto.priority,
      })
      .eq('brand_id', brandId)
      .eq('question', question)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('FAQ not found or update failed');
    }

    return data;
  }

  // Delete a specific FAQ of a brand
  async delete(brandId: string, question: string) {
    const { error } = await this.supabaseClient
      .from('faq')
      .delete()
      .eq('brand_id', brandId)
      .eq('question', question);

    if (error) {
      throw new NotFoundException('FAQ not found or delete failed');
    }

    return { message: 'FAQ deleted successfully' };
  }
}
