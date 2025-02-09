import { Module } from '@nestjs/common';
import { BlockchainListenerService } from './blockchain-listener.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { PaymentModule } from '../payment/payment.module';
import { AddressModule } from '../address/address.module';
import { BlockchainModule } from '../blockchain/blockchain.module';

@Module({
  imports: [
    SupabaseModule,
    PaymentModule,
    AddressModule,
    BlockchainModule,
  ],
  providers: [BlockchainListenerService],
  exports: [BlockchainListenerService],
})
export class BlockchainListenerModule {}
