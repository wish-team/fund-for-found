import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { TierService } from './tier.service';
import { TierController } from './tier.controller';
import { SupabaseAuthGuard } from 'src/guards/owner.guard';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [TierController],
  providers: [
    TierService,
    {
      provide: 'AUTH_GUARD',
      useClass: SupabaseAuthGuard,
    },
  ],
})
export class TierModule {}
