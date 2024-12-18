import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // GET all team members for a specific brand
  async findAllByBrandId(brandId: string) {
    const { data, error } = await this.supabaseClient
      .from('TEAM')
      .select('*')
      .eq('BRAND_ID', brandId);

    if (error) {
      throw new Error(`Error fetching team members: ${error.message}`);
    }

    return data;
  }

  // POST a new team member to a brand
  async create(brandId: string, createTeamDto: CreateTeamDto) {
    const { user_id, role } = createTeamDto;
    const { data, error } = await this.supabaseClient
      .from('TEAM')
      .insert([
        {
          BRAND_ID: brandId,
          USER_ID: user_id,
          ROLE: role,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Error adding team member: ${error.message}`);
    }

    return data;
  }

  // PATCH (update) the role of a specific team member for a brand
  async update(brandId: string, userId: string, updateTeamDto: UpdateTeamDto) {
    const { role } = updateTeamDto;

    const { data, error } = await this.supabaseClient
      .from('TEAM')
      .update({ ROLE: role })
      .eq('BRAND_ID', brandId)
      .eq('USER_ID', userId)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Team member not found or update failed');
    }

    return data;
  }

  // DELETE a specific team member from a brand
  async delete(brandId: string, userId: string) {
    const { data, error } = await this.supabaseClient
      .from('TEAM')
      .delete()
      .eq('BRAND_ID', brandId)
      .eq('USER_ID', userId)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Team member not found or delete failed');
    }

    return data;
  }
}
