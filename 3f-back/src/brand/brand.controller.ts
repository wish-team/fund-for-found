import { Controller, Get, Param } from '@nestjs/common';

@Controller('brand')
export class BrandController {
  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} brand`;
  }
}
