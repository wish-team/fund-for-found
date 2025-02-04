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
  // UsePipes,
  UseGuards,
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

  // GET /brand/:id - Get details of a specific brand
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandService.findOne(id);
  }

  // POST /brand - Create a new brand

  @UseGuards(MyAuthGuard)
  @Post()
  initiateCreating(
    @Req() request,
    @Body(ValidationPipe) createBrandDto: CreateBrandDto,
  ) {
    const owner_id = request.user.id;
    return this.brandService.initiateCreating({ ...createBrandDto, owner_id });
  }

  // PUT /brand/:id - Update a specific brand
  @UseGuards(MyAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateBrandDto: UpdateBrandDto,
  ) {
    return this.brandService.update(id, updateBrandDto);
  }

  // DELETE /brand/:id - Delete a specific brand

  @UseGuards(MyAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.brandService.delete(id);
  }
}
