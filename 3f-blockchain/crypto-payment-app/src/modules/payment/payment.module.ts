import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { AddressModule } from '../address/address.module';
import { SupabaseModule } from '../supabase/supabase.module';
import { BlockchainModule } from '../blockchain/blockchain.module';

@Module({
  imports: [
    AddressModule, 
    SupabaseModule,
    BlockchainModule,
  ],
  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
