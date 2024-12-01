import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  // GET /brands - Get a list of all brands
  @Get()
  findAll() {
    return this.brandsService.findAll();
  }

  // GET /brands/:id - Get details of a specific brand
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandsService.findOne(id);
  }

  // POST /brands - Create a new brand
  @Post()
  create(@Body(ValidationPipe) createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto);
  }

  // PUT /brands/:id - Update a specific brand
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, updateBrandDto);
  }

  // DELETE /brands/:id - Delete a specific brand
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandsService.delete(id);
  }
}
