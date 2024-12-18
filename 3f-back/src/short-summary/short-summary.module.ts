import { Module } from '@nestjs/common';
import { ShortSummaryService } from './short-summary.service';
import { ShortSummaryController } from './short-summary.controller';

@Module({
  controllers: [ShortSummaryController],
  providers: [ShortSummaryService],
})
export class ShortSummaryModule {}
