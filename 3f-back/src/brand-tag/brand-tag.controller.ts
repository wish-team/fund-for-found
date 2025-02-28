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

  // GET /brand-tags/:brandId
  @Get(':brandId')
  async getTags(@Param('brandId') brandId: string) {
    return this.brandTagService.getTagsByBrand(brandId);
  }

  // POST /brand-tags/:brandId
  @Post(':brandId')
  async create(
    @Param('brandId') brandId: string,
    @Body() createBrandTagDto: CreateBrandTagDto[],
  ) {
    return this.brandTagService.createBrandTag(brandId, createBrandTagDto);
  }

  // PATCH /brand-tags/:tagId
  @Patch(':tagId')
  async update(
    @Param('tagId') tagId: string,
    @Body() updateBrandTagDto: UpdateBrandTagDto,
  ) {
    return this.brandTagService.updateBrandTag(tagId, updateBrandTagDto);
  }

  // DELETE /brand-tags/:tagId
  @Delete(':tagId')
  async delete(@Param('tagId') tagId: string) {
    return this.brandTagService.deleteBrandTag(tagId);
  }
}
