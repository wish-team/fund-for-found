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

@Controller('brand-tag')
export class BrandTagController {
  constructor(private readonly brandTagService: BrandTagService) {}

  // GET /brand-tags/:brandId - Get all tags for a brand
  @Get(':brandId')
  getBrandTags(@Param('brandId') brandId: string) {
    return this.brandTagService.getBrandTags(brandId);
  }

  // POST /brand-tags/:brandId - Create tag(s) for a brand
  @Post(':brandId')
  createBrandTag(
    @Param('brandId') brandId: string,
    @Body() createBrandTagDto: CreateBrandTagDto[],
  ) {
    return this.brandTagService.createBrandTag(brandId, createBrandTagDto);
  }

  // PATCH /brand-tags/:tagId - Update a tag
  @Patch(':tagId')
  updateBrandTag(
    @Param('tagId') tagId: string,
    @Body() updateBrandTagDto: UpdateBrandTagDto,
  ) {
    return this.brandTagService.updateBrandTag(tagId, updateBrandTagDto);
  }

  // DELETE /brand-tags/:tagId - Delete a tag
  @Delete(':tagId')
  deleteBrandTag(@Param('tagId') tagId: string) {
    return this.brandTagService.deleteBrandTag(tagId);
  }
}
