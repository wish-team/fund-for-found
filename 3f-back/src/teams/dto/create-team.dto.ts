export class CreateTeamDto {
  brand_id: string; // The ID of the brand (Foreign Key from 'BRAND' table)
  user_id: string; // The ID of the user (Foreign Key from 'USER' table)
  role: string; // Role of the user in the team (e.g., "Admin", "Member")
}
