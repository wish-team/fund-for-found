import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { MyAuthGuard } from 'src/auth/guards/supabase.auth.guard';

@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  // GET /faq/:brandId - Get all FAQs for a specific brand
  @Get(':brandId')
  findAll(@Param('brandId', ParseUUIDPipe) brandId: string) {
    console.log('here');
    return this.faqService.findAll(brandId);
  }

  // POST /faq/:brandId  - Add a new FAQ for a specific brand
  @UseGuards(MyAuthGuard)
  @Post(':brandId')
  create(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Body(ValidationPipe) createFaqDto: CreateFaqDto,
  ) {
    console.log('here');
    return this.faqService.create(brandId, createFaqDto);
  }

  // PUT /faq/:faqId - Update a specific FAQ of a brand
  @Patch(':faqId')
  update(
    @Param('faqId', ParseUUIDPipe) faqId: string,
    @Body(ValidationPipe) updateFaqDto: UpdateFaqDto,
  ) {
    return this.faqService.update(faqId, updateFaqDto);
  }

  // DELETE /faq/:faqId - Delete a specific FAQ of a brand
  @Delete(':faqId')
  delete(@Param('faqId', ParseUUIDPipe) faqId: string) {
    return this.faqService.delete(faqId);
  }
}
