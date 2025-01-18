import { IsString, IsOptional } from 'class-validator';

export class UpdateBrandDto {
  @IsString()
  @IsOptional()
  brand_name?: string;

  @IsString()
  @IsOptional()
  brand_image?: string; // Optional field
}
