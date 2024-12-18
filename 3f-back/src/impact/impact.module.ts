import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { SupabaseAuthGuard } from 'src/guards/owner.guard';
import { ImpactController } from './impact.controller';
import { ImpactService } from './impact.service';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [ImpactController],
  providers: [
    ImpactService,
    {
      provide: 'AUTH_GUARD',
      useClass: SupabaseAuthGuard,
    },
  ],
})
export class ImpactModule {}
