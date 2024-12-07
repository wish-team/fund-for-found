import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';


import { createClient } from '../../utils/supabase/serever';

@Injectable()
export class TeamService {
  supabaseClient = createClient();
  create(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team';
  }

  async findByBrandId(brandId: string): Promise<TeamMember[]> {
    return this.supabaseClient
      .from('TEAM')
      .select('USER_ID, ROLE')
      .eq('BRAND_ID', brandId)
      .then((response) => response.data);
  }

  update(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: number) {
    return `This action removes a #${id} team`;
  }
}
