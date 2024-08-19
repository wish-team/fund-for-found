import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrandController } from './brand/brand.controller';

@Module({
  imports: [],
  controllers: [AppController, BrandController],
  providers: [AppService],
})
export class AppModule {}
