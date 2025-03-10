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
import { BlockModule } from './block/block.module';
import { CollectionModule } from './collection/collection.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule.forRoot([
      {
        name: 'connection1',
        supabaseConfig: {
          supabaseKey: process.env.SUPABASE_ANON_KEY,
          supabaseUrl: process.env.SUPABASE_URL,
        },
      },
      {
        name: 'connection2',
        supabaseConfig: {
          supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
          supabaseUrl: process.env.SUPABASE_URL,
        },
      },
    ]),
    UserModule,
    FaqModule,
    BrandModule,
    TierModule,
    SocialMediaModule,
    BrandTagModule,
    UploadModule,
    AmpModule,
    TeamModule,
    BlockModule,
    CollectionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
