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
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  // GET /brand - Get a list of all brand
  @Get()
  findAll() {
    return this.brandService.findAll();
  }

  // GET /brand/:id - Get details of a specific brand
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandService.findOne(id);
  }

  // POST /brand - Create a new brand
  @Post()
  create(
    @Req() request: any,
    @Body(ValidationPipe) createBrandDto: CreateBrandDto,
  ) {
    const userId = request.user?.id; // Extracted securely from the token
    return this.brandService.create({ ...createBrandDto, owner_id: userId });
  }

  // PUT /brand/:id - Update a specific brand
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateBrandDto: UpdateBrandDto,
  ) {
    console.log(id);
    return this.brandService.update(id, updateBrandDto);
  }

  // DELETE /brand/:id - Delete a specific brand
  //
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandService.delete(id);
  }
}
