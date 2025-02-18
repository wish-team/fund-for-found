import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { CoinModule } from '../coin/coin.module';
import { SupabaseModule } from '../supabase/supabase.module';
import { AddressController } from './address.controller';
@Module({
  imports: [CoinModule, SupabaseModule],
  providers: [AddressService],
  controllers: [AddressController],
  exports: [AddressService],
})
export class AddressModule {}

// src/modules/address/address.service.ts
