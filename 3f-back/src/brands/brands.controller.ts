import {
  Controller,
  Get,
  Post,
  Put,
  Req,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { SupabaseAuthGuard } from 'src/guards/owner.guard';

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
  @UseGuards(SupabaseAuthGuard)
  @Post()
  create(
    @Req() request: any,
    @Body(ValidationPipe) createBrandDto: CreateBrandDto,
  ) {
    const userId = request.user?.id; // Extracted securely from the token
    return this.brandsService.create({ ...createBrandDto, owner_id: userId });
  }

  // PUT /brands/:id - Update a specific brand
  @UseGuards(SupabaseAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandsService.update(id, updateBrandDto);
  }

  // DELETE /brands/:id - Delete a specific brand
  @UseGuards(SupabaseAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandsService.delete(id);
  }
}
