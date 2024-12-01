import { PartialType } from '@nestjs/swagger';
import { CreateImpactDto } from './create-impact.dto';

export class UpdateImpactDto extends PartialType(CreateImpactDto) {}
