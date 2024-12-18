import { Module } from '@nestjs/common';
import { AddressService } from './address.service';

@Module({
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}

// src/modules/address/address.service.ts
