import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AmpService } from './amp.service';
import { AmpController } from './amp.controller';

@Module({
  imports: [HttpModule],
  providers: [AmpService],
  controllers: [AmpController],
})
export class AmpModule {}
