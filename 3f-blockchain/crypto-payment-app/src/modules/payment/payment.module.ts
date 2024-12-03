import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { AddressModule } from '../address/address.module';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [AddressModule, SupabaseModule],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
