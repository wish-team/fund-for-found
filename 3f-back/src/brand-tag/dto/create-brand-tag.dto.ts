import { IsString, IsNotEmpty } from 'class-validator';

export class CreateBrandTagDto {
  @IsString()
  @IsNotEmpty()
  tag_name: string;
}
