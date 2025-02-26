import { IsString, IsOptional } from 'class-validator';

export class UpdateBrandDto {
  @IsString()
  @IsOptional()
  brand_name: string;

  @IsString()
  @IsOptional()
  brand_image?: string;

  @IsString()
  @IsOptional()
  brand_background_image?: string;

  @IsString()
  @IsOptional()
  about_brand: string;

  @IsString()
  @IsOptional()
  brand_country: string;
}
