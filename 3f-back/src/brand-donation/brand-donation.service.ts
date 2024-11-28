import { Injectable } from '@nestjs/common';
import { CreateBrandDonationDto } from './dto/create-brand-donation.dto';
import { UpdateBrandDonationDto } from './dto/update-brand-donation.dto';

@Injectable()
export class BrandDonationService {
  create(createBrandDonationDto: CreateBrandDonationDto) {
    return 'This action adds a new brandDonation';
  }

  findAll() {
    return `This action returns all brandDonation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brandDonation`;
  }

  update(id: number, updateBrandDonationDto: UpdateBrandDonationDto) {
    return `This action updates a #${id} brandDonation`;
  }

  remove(id: number) {
    return `This action removes a #${id} brandDonation`;
  }
}
