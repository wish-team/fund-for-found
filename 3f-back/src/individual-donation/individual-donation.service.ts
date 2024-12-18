import { Injectable } from '@nestjs/common';
import { CreateIndividualDonationDto } from './dto/create-individual-donation.dto';
import { UpdateIndividualDonationDto } from './dto/update-individual-donation.dto';

@Injectable()
export class IndividualDonationService {
  create(createIndividualDonationDto: CreateIndividualDonationDto) {
    return 'This action adds a new individualDonation';
  }

  findAll() {
    return `This action returns all individualDonation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} individualDonation`;
  }

  update(id: number, updateIndividualDonationDto: UpdateIndividualDonationDto) {
    return `This action updates a #${id} individualDonation`;
  }

  remove(id: number) {
    return `This action removes a #${id} individualDonation`;
  }
}
