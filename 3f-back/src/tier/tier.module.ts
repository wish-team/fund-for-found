import { Module } from '@nestjs/common';
import { TierService } from './tier.service';
import { TierController } from './tier.controller';

@Module({
  providers: [TierService],
  controllers: [TierController]
})
export class TierModule {}
