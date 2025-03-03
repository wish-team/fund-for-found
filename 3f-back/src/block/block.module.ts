import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';

@Module({
  imports: [SupabaseModule.injectClient()],
  providers: [BlockService],
  controllers: [BlockController],
  exports: [BlockService],
})
export class BlockModule {}
