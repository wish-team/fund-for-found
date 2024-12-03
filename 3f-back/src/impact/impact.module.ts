import { Module } from '@nestjs/common';
import { ImpactController } from './impact.controller';
import { ImpactService } from './impact.service';

@Module({
  controllers: [ImpactController],
  providers: [ImpactService],
})
export class ImpactModule {}
