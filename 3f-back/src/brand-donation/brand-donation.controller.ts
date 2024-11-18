import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BrandDonationService } from './brand-donation.service';
import { CreateBrandDonationDto } from './dto/create-brand-donation.dto';
import { UpdateBrandDonationDto } from './dto/update-brand-donation.dto';

@Controller('brand-donation')
export class BrandDonationController {
  constructor(private readonly brandDonationService: BrandDonationService) {}

  @Post()
  create(@Body() createBrandDonationDto: CreateBrandDonationDto) {
    return this.brandDonationService.create(createBrandDonationDto);
  }

  @Get()
  findAll() {
    return this.brandDonationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandDonationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBrandDonationDto: UpdateBrandDonationDto,
  ) {
    return this.brandDonationService.update(+id, updateBrandDonationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandDonationService.remove(+id);
  }
}
