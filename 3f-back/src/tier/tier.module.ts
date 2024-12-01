import { Module } from '@nestjs/common';
import { TierService } from './tier.service';
import { TierController } from './tier.controller';

@Module({
  controllers: [TierController],
  providers: [TierService],
})
export class TierModule {}
