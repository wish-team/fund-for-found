import { PartialType } from '@nestjs/swagger';
import { CreateShortSummaryDto } from './create-short-summary.dto';

export class UpdateShortSummaryDto extends PartialType(CreateShortSummaryDto) {}
