import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';

import { FaqModule } from './faq/faq.module';
// import { AuthMiddleware } from './middleware/auth.middleware';
import { BrandsModule } from './brands/brands.module';
import { TierModule } from './tier/tier.module';
@Module({
  imports: [
    UsersModule,
    TeamsModule,
    FaqModule,
    BrandsModule,
    SupabaseModule.forRoot({
      supabaseKey: process.env.SUPABASE_ANON_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
    }),
    TierModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
