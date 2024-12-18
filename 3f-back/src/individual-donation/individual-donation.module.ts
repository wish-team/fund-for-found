import { Module } from '@nestjs/common';
import { IndividualDonationService } from './individual-donation.service';
import { IndividualDonationController } from './individual-donation.controller';

@Module({
  controllers: [IndividualDonationController],
  providers: [IndividualDonationService],
})
export class IndividualDonationModule {}
