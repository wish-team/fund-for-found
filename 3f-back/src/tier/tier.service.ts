import { Injectable } from '@nestjs/common';
import { CreateTierDto } from './dto/create-tier.dto';
import { UpdateTierDto } from './dto/update-tier.dto';

@Injectable()
export class TierService {
  create(createTierDto: CreateTierDto) {
    return 'This action adds a new tier';
  }

  findAll() {
    return `This action returns all tier`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tier`;
  }

  update(id: number, updateTierDto: UpdateTierDto) {
    return `This action updates a #${id} tier`;
  }

  remove(id: number) {
    return `This action removes a #${id} tier`;
  }
}
