import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './brands/brands.module';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [UsersModule, BrandsModule, TeamsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
