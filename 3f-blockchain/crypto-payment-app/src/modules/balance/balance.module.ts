import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { AddressModule } from '../address/address.module'; // Import AddressModule
import { CoinModule } from '../coin/coin.module';

@Module({
  imports: [AddressModule, CoinModule], // Add AddressModule to imports
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
