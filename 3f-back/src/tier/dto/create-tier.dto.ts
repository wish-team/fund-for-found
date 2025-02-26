import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateTierDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  amount: number;

  @IsString()
  @IsOptional()
  tier_image?: string;
}
