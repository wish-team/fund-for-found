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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SupabaseAuthGuard } from 'src/guards/owner.guard';

@Controller('brands/:brandId/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // GET /brands/:brandId/categories - Get all categories for a specific brand
  @UseGuards(SupabaseAuthGuard)
  @Get()
  findAll(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return this.categoryService.findAll(brandId);
  }

  // POST /brands/:brandId/categories - Create a new category for a brand
  @UseGuards(SupabaseAuthGuard)
  @Post()
  create(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
  ) {
    return this.categoryService.create(brandId, createCategoryDto);
  }

  // PUT /brands/:brandId/categories/:categoryName - Update a specific category
  @UseGuards(SupabaseAuthGuard)
  @Patch(':categoryName')
  update(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('categoryName') categoryName: string,
    @Body(ValidationPipe) updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(
      brandId,
      categoryName,
      updateCategoryDto,
    );
  }

  // DELETE /brands/:brandId/categories/:categoryName - Delete a specific category
  @UseGuards(SupabaseAuthGuard)
  @Delete(':categoryName')
  delete(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('categoryName') categoryName: string,
  ) {
    return this.categoryService.delete(brandId, categoryName);
  }
}
