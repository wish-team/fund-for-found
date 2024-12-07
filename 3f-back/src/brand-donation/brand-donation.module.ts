import { Module } from '@nestjs/common';
import { BrandDonationService } from './brand-donation.service';
import { BrandDonationController } from './brand-donation.controller';

@Module({
  controllers: [BrandDonationController],
  providers: [BrandDonationService],
})
export class BrandDonationModule {}
