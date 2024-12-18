import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseUUIDPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { SupabaseAuthGuard } from 'src/guards/owner.guard';

@Controller('brands/:brandId/faqs')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  // GET /brands/:brandId/faqs - Get all FAQs for a specific brand
  @UseGuards(SupabaseAuthGuard)
  @Get()
  findAll(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return this.faqService.findAll(brandId);
  }

  // POST /brands/:brandId/faqs - Add a new FAQ for a specific brand
  @UseGuards(SupabaseAuthGuard)
  @Post()
  create(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Body(ValidationPipe) createFaqDto: CreateFaqDto,
  ) {
    return this.faqService.create(brandId, createFaqDto);
  }

  // PUT /brands/:brandId/faqs/:text - Update a specific FAQ of a brand
  @UseGuards(SupabaseAuthGuard)
  @Patch(':text')
  update(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('text') text: string,
    @Body(ValidationPipe) updateFaqDto: UpdateFaqDto,
  ) {
    return this.faqService.update(brandId, text, updateFaqDto);
  }

  // DELETE /brands/:brandId/faqs/:text - Delete a specific FAQ of a brand
  @UseGuards(SupabaseAuthGuard)
  @Delete(':text')
  delete(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('text') text: string,
  ) {
    return this.faqService.delete(brandId, text);
  }
}
