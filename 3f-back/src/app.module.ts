// External modules
import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
// App
import { AppController } from './app.controller';
import { AppService } from './app.service';
// Internal modules
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { FaqModule } from './faq/faq.module';
import { TierModule } from './tier/tier.module';
import { SocialMediaModule } from './social-media/social-media.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [
    UsersModule,
    TeamsModule,
    FaqModule,
    BrandModule,
    SupabaseModule.forRoot({
      supabaseKey: process.env.SUPABASE_ANON_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
    }),
    TierModule,
    SocialMediaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
