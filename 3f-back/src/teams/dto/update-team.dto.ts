import { IsUUID, IsString, IsOptional } from 'class-validator';

export class UpdateTeamDto {
  @IsUUID()
  @IsOptional()
  user_id?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
