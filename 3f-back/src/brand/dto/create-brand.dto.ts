import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateBrandTagDto } from '../../brand-tag/dto/create-brand-tag.dto';
import { CreateSocialMediaDto } from '../../social-media/dto/create-social-media.dto';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  brand_name: string;

  @IsString()
  @IsOptional()
  brand_image?: string;

  @IsString()
  @IsNotEmpty()
  about_brand: string;

  @IsString()
  @IsNotEmpty()
  brand_country: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBrandTagDto)
  @IsOptional()
  brand_tags?: CreateBrandTagDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSocialMediaDto)
  @IsOptional()
  social_media?: CreateSocialMediaDto[];
}
