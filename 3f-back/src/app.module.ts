import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandController } from './brand/brand.controller';
import { BrandService } from './brand/brand.service';
import { PrismaService } from './prisma.service';
import { UserController } from './user/user.controller';
import { User } from './user/user';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [AppController, BrandController, UserController],
  providers: [AppService, BrandService, PrismaService, User, UserService],
})
export class AppModule {}
