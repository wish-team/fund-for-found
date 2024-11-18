import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IndividualDonationService } from './individual-donation.service';
import { CreateIndividualDonationDto } from './dto/create-individual-donation.dto';
import { UpdateIndividualDonationDto } from './dto/update-individual-donation.dto';

@Controller('individual-donation')
export class IndividualDonationController {
  constructor(
    private readonly individualDonationService: IndividualDonationService,
  ) {}

  @Post()
  create(@Body() createIndividualDonationDto: CreateIndividualDonationDto) {
    return this.individualDonationService.create(createIndividualDonationDto);
  }

  @Get()
  findAll() {
    return this.individualDonationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.individualDonationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIndividualDonationDto: UpdateIndividualDonationDto,
  ) {
    return this.individualDonationService.update(
      +id,
      updateIndividualDonationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.individualDonationService.remove(+id);
  }
}
