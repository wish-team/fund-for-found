import { IsUUID, IsString, IsOptional } from 'class-validator';

export class UpdateTeamDto {
  @IsUUID()
  @IsOptional()
  user_id?: string; // Optional: The ID of the user (Foreign Key from 'USER' table)

  @IsString()
  @IsOptional()
  role?: string; // Optional: Role of the user in the team (e.g., "Admin", "Member")
}
