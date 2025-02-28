import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { SocialMediaService } from './social-media.service';
import { SocialMediaController } from './social-media.controller';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [SocialMediaController],
  providers: [SocialMediaService],
  exports: [SocialMediaService],
})
export class SocialMediaModule {}
