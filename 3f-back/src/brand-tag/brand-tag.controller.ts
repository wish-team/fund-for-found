import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandTagService } from './brand-tag.service';
import { CreateBrandTagDto } from './dto/create-brand-tag.dto';
import { UpdateBrandTagDto } from './dto/update-brand-tag.dto';

@Controller('brand-tag')
export class BrandTagController {
  constructor(private readonly brandTagService: BrandTagService) {}

  @Post()
  create(@Body() createBrandTagDto: CreateBrandTagDto) {
    return this.brandTagService.create(createBrandTagDto);
  }

  @Get()
  findAll() {
    return this.brandTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandTagService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBrandTagDto: UpdateBrandTagDto,
  ) {
    return this.brandTagService.update(+id, updateBrandTagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandTagService.remove(+id);
  }
}
