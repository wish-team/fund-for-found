import { PartialType } from '@nestjs/swagger';
import { CreateBrandTagDto } from './create-brand-tag.dto';

export class UpdateBrandTagDto extends PartialType(CreateBrandTagDto) {}
