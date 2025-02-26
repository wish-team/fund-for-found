import {
  Controller,
  Get,
  Post,
  Req,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  ValidationPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { MyAuthGuard } from 'src/auth/guards/supabase.auth.guard';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  // GET /brand - Get a list of all brand
  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  // GET /brand/:brandId - Get details of a specific brand
  @Get(':brandId')
  findOne(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return this.brandService.findOne(brandId);
  }

  // POST /brand - Create a new brand
  @UseGuards(MyAuthGuard)
  @Post()
  initiateCreating(
    @Req() request,
    @Body(ValidationPipe) createBrandDto: CreateBrandDto,
  ) {
    const owner_id = request.user.id;
    return this.brandService.initiateCreating(owner_id, createBrandDto);
  }

  // PUT /brand/:brandId - Update a specific brand
  @UseGuards(MyAuthGuard)
  @Patch(':brandId')
  update(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Body(ValidationPipe) updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.update(brandId, updateBrandDto);
  }

  // DELETE /brand/:brandId - Delete a specific brand
  @UseGuards(MyAuthGuard)
  @Delete(':brandId')
  delete(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return this.brandService.delete(brandId);
  }
}
