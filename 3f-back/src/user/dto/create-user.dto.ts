import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  user_first_name: string;

  @IsString()
  @IsNotEmpty()
  user_last_name: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}
