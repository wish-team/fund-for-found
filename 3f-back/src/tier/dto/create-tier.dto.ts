import { IsString, IsInt } from 'class-validator';

export class CreateTierDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  amount: number;

  @IsString()
  tier_image: string;
}
