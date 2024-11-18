import { PartialType } from '@nestjs/swagger';
import { CreateBrandDonationDto } from './create-brand-donation.dto';

export class UpdateBrandDonationDto extends PartialType(
  CreateBrandDonationDto,
) {}
