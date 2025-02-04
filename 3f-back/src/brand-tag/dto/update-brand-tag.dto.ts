import { IsString, IsOptional } from 'class-validator';

export class UpdateBrandTagDto {
  @IsString()
  @IsOptional()
  tag_name?: string;
}
