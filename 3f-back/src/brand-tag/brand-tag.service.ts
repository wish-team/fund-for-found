import { Injectable } from '@nestjs/common';
import { CreateBrandTagDto } from './dto/create-brand-tag.dto';
import { UpdateBrandTagDto } from './dto/update-brand-tag.dto';

@Injectable()
export class BrandTagService {
  create(createBrandTagDto: CreateBrandTagDto) {
    return 'This action adds a new brandTag';
  }

  findAll() {
    return `This action returns all brandTag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brandTag`;
  }

  update(id: number, updateBrandTagDto: UpdateBrandTagDto) {
    return `This action updates a #${id} brandTag`;
  }

  remove(id: number) {
    return `This action removes a #${id} brandTag`;
  }
}
