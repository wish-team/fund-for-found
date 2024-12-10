import { Module } from '@nestjs/common';
import { PaymentModule } from './modules/payment/payment.module';
import { BlockchainListenerModule } from './modules/blockchain-listener/blockchain-listener.module';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { AddressModule } from './modules/address/address.module';
import { CoinModule } from './modules/coin/coin.module';
import { BalanceModule } from './modules/balance/balance.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';

@Module({
  imports: [
    PaymentModule,
    BlockchainListenerModule,
    SupabaseModule,
    AddressModule,
    CoinModule,
    BalanceModule,
    BlockchainModule,
  ],
})
export class AppModule {}
