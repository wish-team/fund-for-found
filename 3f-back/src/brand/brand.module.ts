import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';

import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
