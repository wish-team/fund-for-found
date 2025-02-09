import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BlockchainListenerModule } from './modules/blockchain-listener/blockchain-listener.module';
import { PaymentModule } from './modules/payment/payment.module';
import { AddressModule } from './modules/address/address.module';
import { SupabaseModule } from './modules/supabase/supabase.module';
import { BlockchainModule } from './modules/blockchain/blockchain.module';
import { CoinModule } from './modules/coin/coin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BlockchainModule,
    BlockchainListenerModule,
    PaymentModule,
    AddressModule,
    SupabaseModule,
    CoinModule,
  ],
})
export class AppModule {}
