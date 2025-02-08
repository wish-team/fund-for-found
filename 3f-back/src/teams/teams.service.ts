import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // GET /team/:id - Get all team members for a specific brand
  async findAllByBrandId(brandId: string) {
    const { data, error } = await this.supabaseClient
      .from('team')
      .select('*')
      .eq('brand_id', brandId);

    if (error) {
      throw new Error(`Error fetching team members: ${error.message}`);
    }

    return data;
  }

  // POST /brands/:brandId/teams - Add a new team member to a brand
  async create(brandId: string, createTeamDto: CreateTeamDto) {
    const { data, error } = await this.supabaseClient.from('team').insert([
      {
        brand_id: brandId,
        user_id: createTeamDto.team_user_email,
        role: createTeamDto.role,
        description: createTeamDto.description,
        team_user_image: createTeamDto.team_user_image,
      },
    ]);

    if (error) {
      throw new Error(`Error adding team member: ${error.message}`);
    }

    return data;
  }

  // PATCH /team/:teamId - Update the role of a specific team member for a brand
  async update(teamId: string, updateTeamDto: UpdateTeamDto) {
    const { data, error } = await this.supabaseClient
      .from('team')
      .update({
        team_user_email: updateTeamDto.team_user_email,
        role: updateTeamDto.role,
        description: updateTeamDto.description,
        team_user_image: updateTeamDto.team_user_image,
      })
      .eq('team_id', teamId);

    if (error || !data) {
      throw new NotFoundException('Team member not found or update failed');
    }

    return data;
  }

  // DELETE /team/:teamId - Remove a specific team member from a brand
  async delete(teamId: string) {
    const { data, error } = await this.supabaseClient
      .from('team')
      .delete()
      .eq('team_id', teamId);

    if (error || !data) {
      throw new NotFoundException('Team member not found or delete failed');
    }

    return data;
  }
}
