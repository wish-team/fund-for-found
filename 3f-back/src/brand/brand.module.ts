import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandTagModule } from '../brand-tag/brand-tag.module';
import { SocialMediaModule } from '../social-media/social-media.module';

@Module({
  imports: [
    SupabaseModule.injectClient('connection1'),
    BrandTagModule,
    SocialMediaModule,
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
