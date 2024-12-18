import { PartialType } from '@nestjs/swagger';
import { CreateIndividualDonationDto } from './create-individual-donation.dto';

export class UpdateIndividualDonationDto extends PartialType(
  CreateIndividualDonationDto,
) {}
