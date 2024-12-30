import { Module } from '@nestjs/common';
import { FaqController } from './faq.controller';
import { SupabaseModule } from 'nestjs-supabase-js';

import { FaqService } from './faq.service';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
