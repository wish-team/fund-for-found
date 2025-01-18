import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { TierService } from './tier.service';
import { TierController } from './tier.controller';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [TierController],
  providers: [TierService],
})
export class TierModule {}
