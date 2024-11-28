import { Module } from '@nestjs/common';
import { ImpactService } from './impact.service';
import { ImpactController } from './impact.controller';

@Module({
  controllers: [ImpactController],
  providers: [ImpactService],
})
export class ImpactModule {}
