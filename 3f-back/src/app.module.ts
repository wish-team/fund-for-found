// External modules
import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
// App
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Internal modules
import { UserModule } from './user/user.module';
import { FaqModule } from './faq/faq.module';
import { TierModule } from './tier/tier.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { BrandModule } from './brand/brand.module';
import { BrandTagModule } from './brand-tag/brand-tag.module';
import { UploadModule } from './upload/upload.module';
// Auth
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AmpModule } from './amp/amp.module';
import { TeamModule } from './team/team.module';
import { InvitationController } from './invitation/invitation.controller';
import { InvitationModule } from './invitation/invitation.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule.forRoot({
      supabaseKey: process.env.SUPABASE_ANON_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
    }),
    UserModule,
    FaqModule,
    BrandModule,
    TierModule,
    SocialMediaModule,
    AuthModule,
    BrandTagModule,
    UploadModule,
    AmpModule,
    TeamModule,
    InvitationModule,
  ],
  controllers: [AppController, InvitationController],
  providers: [AppService],
})
export class AppModule {}
