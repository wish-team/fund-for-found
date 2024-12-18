import { Module } from '@nestjs/common';
import { BrandTagService } from './brand-tag.service';
import { BrandTagController } from './brand-tag.controller';

@Module({
  controllers: [BrandTagController],
  providers: [BrandTagService],
})
export class BrandTagModule {}
