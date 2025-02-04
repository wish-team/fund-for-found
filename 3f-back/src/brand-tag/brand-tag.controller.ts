import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { BrandTagService } from './brand-tag.service';
import { CreateBrandTagDto } from './dto/create-brand-tag.dto';
import { UpdateBrandTagDto } from './dto/update-brand-tag.dto';

@Controller('brand-tags')
export class BrandTagController {
  constructor(private readonly brandTagService: BrandTagService) {}

  @Post()
  async create(@Body() createBrandTagDto: CreateBrandTagDto) {
    return this.brandTagService.createBrandTag(createBrandTagDto);
  }

  @Get(':brand_id')
  async getTags(@Param('brand_id') brand_id: string) {
    return this.brandTagService.getTagsByBrand(brand_id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBrandTagDto: UpdateBrandTagDto,
  ) {
    return this.brandTagService.updateBrandTag(id, updateBrandTagDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.brandTagService.deleteBrandTag(id);
  }
}
