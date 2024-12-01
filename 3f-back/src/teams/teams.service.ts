import { Injectable } from '@nestjs/common';
import { supabase } from '../../utils/supabase/client'; // Assuming you're using Supabase for database operations
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {
  // GET all team members for a specific brand
  async findAllByBrandId(brandId: string) {
    const { data, error } = await supabase
      .from('TEAM') // Assuming 'TEAM' is your table name
      .select('*')
      .eq('BRAND_ID', brandId); // Use the capitalized column names

    if (error) {
      throw new Error(`Error fetching team members: ${error.message}`);
    }

    return data;
  }

  // POST a new team member to a brand
  async create(brandId: string, createTeamDto: CreateTeamDto) {
    const { user_id, role } = createTeamDto;

    const { data, error } = await supabase
      .from('TEAM') // Assuming 'TEAM' is your table name
      .insert([
        {
          BRAND_ID: brandId,
          USER_ID: user_id,
          ROLE: role,
        },
      ]);

    if (error) {
      throw new Error(`Error adding team member: ${error.message}`);
    }

    return data;
  }

  // PUT (update) the role of a specific team member for a brand
  async update(brandId: string, userId: string, updateTeamDto: UpdateTeamDto) {
    const { role } = updateTeamDto;

    const { data, error } = await supabase
      .from('TEAM') // Assuming 'TEAM' is your table name
      .update({ ROLE: role })
      .eq('BRAND_ID', brandId)
      .eq('USER_ID', userId);

    if (error) {
      throw new Error(`Error updating team member role: ${error.message}`);
    }

    return data;
  }

  // DELETE a specific team member from a brand
  async delete(brandId: string, userId: string) {
    const { data, error } = await supabase
      .from('TEAM') // Assuming 'TEAM' is your table name
      .delete()
      .eq('BRAND_ID', brandId)
      .eq('USER_ID', userId);

    if (error) {
      throw new Error(`Error deleting team member: ${error.message}`);
    }

    return data;
  }
}
