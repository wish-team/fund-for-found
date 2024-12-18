import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { SupabaseModule } from 'nestjs-supabase-js';
import { SupabaseAuthGuard } from 'src/guards/owner.guard';
import { FaqService } from './faq.service';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [FaqController],
  providers: [
    FaqService,
    {
      provide: 'AUTH_GUARD',
      useClass: SupabaseAuthGuard,
    },
  ],
})
export class FaqModule {}
