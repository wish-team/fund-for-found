import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { FaqController } from './faq.controller';
import { FaqService } from './faq.service';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [FaqController],
  providers: [FaqService],
})
export class FaqModule {}
