import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ImpactService } from './impact.service';
import { CreateImpactDto } from './dto/create-impact.dto';
import { UpdateImpactDto } from './dto/update-impact.dto';

@Controller('impact')
export class ImpactController {
  constructor(private readonly impactService: ImpactService) {}

  @Post()
  create(@Body() createImpactDto: CreateImpactDto) {
    return this.impactService.create(createImpactDto);
  }

  @Get()
  findAll() {
    return this.impactService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.impactService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImpactDto: UpdateImpactDto) {
    return this.impactService.update(+id, updateImpactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.impactService.remove(+id);
  }
}
