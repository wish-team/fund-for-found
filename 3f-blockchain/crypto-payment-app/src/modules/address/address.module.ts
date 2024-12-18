import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { CoinModule } from '../coin/coin.module';

@Module({
  imports: [CoinModule],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}

// src/modules/address/address.service.ts
