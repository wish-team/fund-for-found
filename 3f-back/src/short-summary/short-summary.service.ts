import { Injectable } from '@nestjs/common';
import { CreateShortSummaryDto } from './dto/create-short-summary.dto';
import { UpdateShortSummaryDto } from './dto/update-short-summary.dto';

@Injectable()
export class ShortSummaryService {
  create(createShortSummaryDto: CreateShortSummaryDto) {
    return 'This action adds a new shortSummary';
  }

  findAll() {
    return `This action returns all shortSummary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shortSummary`;
  }

  update(id: number, updateShortSummaryDto: UpdateShortSummaryDto) {
    return `This action updates a #${id} shortSummary`;
  }

  remove(id: number) {
    return `This action removes a #${id} shortSummary`;
  }
}
