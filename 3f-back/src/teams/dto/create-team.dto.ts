import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
