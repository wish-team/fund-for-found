import { Module } from '@nestjs/common';
import { BrandTagService } from './brand-tag.service';
import { SupabaseModule } from 'nestjs-supabase-js';
import { BrandTagController } from './brand-tag.controller';

@Module({
  imports: [SupabaseModule.injectClient()],
  providers: [BrandTagService],
  controllers: [BrandTagController],
  exports: [BrandTagService],
})
export class BrandTagModule {}
