import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Brand as BrandModel } from '@prisma/client';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateBrandDto } from './dto/create-brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}
  @Get(':id')
  async getBrandById(@Param('id') id: string): Promise<BrandModel> {
    return this.brandService.brand({ id: Number(id) });
  }

  @Post()
  @ApiOperation({ summary: 'Create brand' })
  @ApiResponse({
    status: 201,
    description: 'The created record',
  })
  async createBrand(@Body() brandData: CreateBrandDto): Promise<BrandModel> {
    return this.brandService.createBrand(brandData);
  }
}
