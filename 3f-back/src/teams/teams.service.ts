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
      .from('team')
      .select('*')
      .eq('brand_id', brandId);

    if (error) {
      throw new Error(`Error fetching team members: ${error.message}`);
    }

    return data;
  }

  // POST a new team member to a brand
  async create(brandId: string, createTeamDto: CreateTeamDto) {
    const { user_id, role, description } = createTeamDto;
    const { data, error } = await this.supabaseClient
      .from('team')
      .insert([
        {
          brand_id: brandId,
          user_id: user_id,
          role: role,
          description: description,
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
    const { role, description } = updateTeamDto;

    const { data, error } = await this.supabaseClient
      .from('team')
      .update({ role: role, description: description })
      .eq('brand_id', brandId)
      .eq('user_id', userId)
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
      .from('team')
      .delete()
      .eq('brand_id', brandId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException('Team member not found or delete failed');
    }

    return data;
  }
}
