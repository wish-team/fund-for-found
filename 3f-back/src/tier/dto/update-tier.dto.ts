import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateTierDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  amount?: number;

  @IsString()
  @IsOptional()
  tier_image: string;
}
