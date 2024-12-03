import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  user_name?: string;

  @IsString()
  @IsOptional()
  user_last_name?: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsOptional() // Allows for optional creation timestamps
  created_at?: Date;

  @IsOptional() // Allows for optional update timestamps
  updated_at?: Date;
}
