import { Module } from '@nestjs/common';
import { CryptoTransactionService } from './crypto-transaction.service';
import { CryptoTransactionController } from './crypto-transaction.controller';

@Module({
  controllers: [CryptoTransactionController],
  providers: [CryptoTransactionService],
})
export class CryptoTransactionModule {}
