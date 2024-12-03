import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TeamsModule } from './teams/teams.module';
import { ImpactModule } from './impact/impact.module';
import { CategoryModule } from './category/category.module';
import { FaqModule } from './faq/faq.module';
import { AuthMiddleware } from './middleware/auth.middleware'; // Update this path if needed
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [
    UsersModule,
    TeamsModule,
    ImpactModule,
    FaqModule,
    BrandsModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*'); // Apply middleware to all routes
  }
}
