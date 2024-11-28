import { Injectable } from '@nestjs/common';
import { CreateImpactDto } from './dto/create-impact.dto';
import { UpdateImpactDto } from './dto/update-impact.dto';

@Injectable()
export class ImpactService {
  create(createImpactDto: CreateImpactDto) {
    return 'This action adds a new impact';
  }

  findAll() {
    return `This action returns all impact`;
  }

  findOne(id: number) {
    return `This action returns a #${id} impact`;
  }

  update(id: number, updateImpactDto: UpdateImpactDto) {
    return `This action updates a #${id} impact`;
  }

  remove(id: number) {
    return `This action removes a #${id} impact`;
  }
}
