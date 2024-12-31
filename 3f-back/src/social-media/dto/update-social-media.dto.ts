import { IsString, IsOptional } from 'class-validator';

export class UpdateSocialMediaDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  link?: string;
}
