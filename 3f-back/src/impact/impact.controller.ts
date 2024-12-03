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
} from '@nestjs/common';
import { ImpactService } from './impact.service';
import { CreateImpactDto } from './dto/create-impact.dto';
import { UpdateImpactDto } from './dto/update-impact.dto';

@Controller('brands/:brandId/impacts')
export class ImpactController {
  constructor(private readonly impactService: ImpactService) {}

  // GET /brands/:brandId/impacts - Get all impacts for a specific brand
  @Get()
  findAll(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return this.impactService.findAll(brandId);
  }

  // POST /brands/:brandId/impacts - Add a new impact for a specific brand
  @Post()
  create(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Body(ValidationPipe) createImpactDto: CreateImpactDto,
  ) {
    return this.impactService.create(brandId, createImpactDto);
  }

  // PUT /brands/:brandId/impacts/:text - Update a specific impact of a brand
  @Patch(':text')
  update(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('text') text: string,
    @Body(ValidationPipe) updateImpactDto: UpdateImpactDto,
  ) {
    return this.impactService.update(brandId, text, updateImpactDto);
  }

  // DELETE /brands/:brandId/impacts/:text - Delete a specific impact of a brand
  @Delete(':text')
  delete(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('text') text: string,
  ) {
    return this.impactService.delete(brandId, text);
  }
}
