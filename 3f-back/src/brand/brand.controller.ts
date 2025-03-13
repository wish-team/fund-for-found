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
  findAllBrands() {
    return this.brandService.findAllBrands();
  }

  // GET /brand/:brandId - Get details of a specific brand
  @Get(':brandId')
  findOneBrand(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return this.brandService.findOneBrand(brandId);
  }

  // POST /brand - Create a new brand
  // @UseGuards(MyAuthGuard)
  @Post()
  brandInitiation(
    @Req() request,
    @Body(ValidationPipe) createBrandDto: CreateBrandDto,
  ) {
    console.log(request.headers);
    const owner_id = request.user.id;
    return this.brandService.brandInitiation(owner_id, createBrandDto);
  }

  // PUT /brand/:brandId - Update a specific brand
  @UseGuards(MyAuthGuard)
  @Patch(':brandId')
  updateBrand(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Body(ValidationPipe) updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.updateBrand(brandId, updateBrandDto);
  }

  // DELETE /brand/:brandId - Delete a specific brand
  @UseGuards(MyAuthGuard)
  @Delete(':brandId')
  deleteBrand(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return this.brandService.deleteBrand(brandId);
  }
}
