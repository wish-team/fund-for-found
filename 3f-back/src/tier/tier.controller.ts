import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TierService } from './tier.service';
import { CreateTierDto } from './dto/create-tier.dto';
import { UpdateTierDto } from './dto/update-tier.dto';

@Controller('tier')
export class TierController {
  constructor(private readonly tierService: TierService) {}

  @Post()
  create(@Body() createTierDto: CreateTierDto) {
    return this.tierService.create(createTierDto);
  }

  @Get()
  findAll() {
    return this.tierService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tierService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTierDto: UpdateTierDto) {
    return this.tierService.update(+id, updateTierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tierService.remove(+id);
  }
}
