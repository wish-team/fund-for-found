// src/token/token.module.ts

import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { CoinModule } from '../coin/coin.module';

@Module({
  imports: [CoinModule],
  controllers: [TokenController],
})
export class TokenModule {}
