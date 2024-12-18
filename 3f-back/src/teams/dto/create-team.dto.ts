import { IsUUID, IsString, IsNotEmpty } from 'class-validator';

export class CreateTeamDto {
  @IsUUID()
  @IsNotEmpty()
  user_id: string; // The ID of the user (Foreign Key from 'USER' table)

  @IsString()
  @IsNotEmpty()
  role: string; // Role of the user in the team (e.g., "Admin", "Member")
}
