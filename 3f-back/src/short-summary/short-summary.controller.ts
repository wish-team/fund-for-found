import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ShortSummaryService } from './short-summary.service';
import { CreateShortSummaryDto } from './dto/create-short-summary.dto';
import { UpdateShortSummaryDto } from './dto/update-short-summary.dto';

@Controller('short-summary')
export class ShortSummaryController {
  constructor(private readonly shortSummaryService: ShortSummaryService) {}

  @Post()
  create(@Body() createShortSummaryDto: CreateShortSummaryDto) {
    return this.shortSummaryService.create(createShortSummaryDto);
  }

  @Get()
  findAll() {
    return this.shortSummaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shortSummaryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateShortSummaryDto: UpdateShortSummaryDto,
  ) {
    return this.shortSummaryService.update(+id, updateShortSummaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shortSummaryService.remove(+id);
  }
}
