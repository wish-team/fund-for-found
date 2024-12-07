import { Module } from '@nestjs/common';
import { CryptoWalletService } from './crypto-wallet.service';
import { CryptoWalletController } from './crypto-wallet.controller';

@Module({
  controllers: [CryptoWalletController],
  providers: [CryptoWalletService],
})
export class CryptoWalletModule {}
