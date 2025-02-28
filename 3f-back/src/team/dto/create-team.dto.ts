import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateTeamDto {
  @IsEmail()
  @IsNotEmpty()
  team_user_email: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  team_user_image: string;
}
