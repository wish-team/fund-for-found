import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateTeamDto {
  @IsEmail()
  @IsOptional()
  team_user_email: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsString()
  team_user_image?: string;
}
