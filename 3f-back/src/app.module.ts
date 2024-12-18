import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { ImpactModule } from './impact/impact.module';
import { CategoryModule } from './category/category.module';
import { FaqModule } from './faq/faq.module';
// import { AuthMiddleware } from './middleware/auth.middleware';
import { BrandsModule } from './brands/brands.module';
@Module({
  imports: [
    UsersModule,
    TeamsModule,
    ImpactModule,
    FaqModule,
    BrandsModule,
    CategoryModule,
    SupabaseModule.forRoot({
      supabaseKey: process.env.SUPABASE_ANON_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
