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
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Req() request, @Body(ValidationPipe) createBrandDto: CreateBrandDto) {
    const owner_id = request.user.sub;
    console.log(owner_id);
    return this.brandService.create({ ...createBrandDto, owner_id });
  }

  // PUT /brand/:id - Update a specific brand
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.update(id, updateBrandDto);
  }

  // DELETE /brand/:id - Delete a specific brand
  @Delete(':id')
  @UsePipes(ValidationPipe)
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return await this.brandService.delete(id);
  }
}
