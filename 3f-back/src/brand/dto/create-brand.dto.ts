import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  brand_name: string;

  @IsString()
  @IsOptional()
  brand_image?: string; // Optional field
}
