import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // GET /faq/:brandId - Get all FAQs for a specific brand
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

  // POST /faq/:brandId  - Add a new FAQ for a specific brand
  async create(brandId: string, createFaqDto: CreateFaqDto) {
    const { data, error } = await this.supabaseClient.from('faq').insert({
      brand_id: brandId,
      question: createFaqDto.question,
      answer: createFaqDto.answer,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data ?? { message: 'The faq is created successfully' };
  }

  // PUT /faq/:faqId - Update a specific FAQ of a brand
  async update(faqId: string, updateFaqDto: UpdateFaqDto) {
    const { data, error } = await this.supabaseClient
      .from('faq')
      .update({
        question: updateFaqDto.question,
        answer: updateFaqDto.answer,
      })
      .eq('faq_id', faqId);

    if (error) {
      throw new NotFoundException('FAQ not found or update failed');
    }

    return data ?? { message: 'FAQ updated successfully' };
  }

  // DELETE /faq/:faqId - Delete a specific FAQ of a brand
  async delete(faqId: string) {
    const { error } = await this.supabaseClient
      .from('faq')
      .delete()
      .eq('faq_id', faqId);

    if (error) {
      throw new NotFoundException('FAQ not found or delete failed');
    }

    return { message: 'FAQ deleted successfully' };
  }
}
