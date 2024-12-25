import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { SocialMediaService } from './social-media.service';
import { SocialMediaController } from './social-media.controller';
import { SupabaseAuthGuard } from 'src/guards/owner.guard'; // Adjust if the guard is specific to the social media module

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [SocialMediaController],
  providers: [
    SocialMediaService,
    {
      provide: 'AUTH_GUARD',
      useClass: SupabaseAuthGuard, // Adjust if you need a specific guard for the social media module
    },
  ],
})
export class SocialMediaModule {}
