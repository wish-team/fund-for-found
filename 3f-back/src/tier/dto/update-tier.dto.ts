import { PartialType } from '@nestjs/swagger';
import { CreateTierDto } from './create-tier.dto';

export class UpdateTierDto extends PartialType(CreateTierDto) {}
