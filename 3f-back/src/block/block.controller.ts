import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BlockService } from './block.service';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  create(@Body() createBlockDto: any) {
    return this.blockService.create(createBlockDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blockService.findOne(id);
  }
}