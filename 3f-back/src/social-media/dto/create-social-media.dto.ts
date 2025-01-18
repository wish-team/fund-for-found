import { IsString } from 'class-validator';

export class CreateSocialMediaDto {
  @IsString()
  name: string;

  @IsString()
  link: string;
}
