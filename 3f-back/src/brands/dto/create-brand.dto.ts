import { IsUUID, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBrandDto {
  @IsUUID()
  @IsNotEmpty()
  owner_id: string; // FK to USER_ID

  @IsString()
  @IsNotEmpty()
  brand_name: string;

  @IsString()
  @IsOptional()
  brand_image?: string; // Optional field
}
