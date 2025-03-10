import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { InjectSupabaseClient } from 'nestjs-supabase-js';

@Injectable()
export class TeamService {
  constructor(
    @InjectSupabaseClient('connection1')
    private readonly supabaseClient: SupabaseClient,
    @InjectSupabaseClient('connection2')
    private readonly supabaseClientAdmin: SupabaseClient,
  ) {}

  // GET /team/:brandId - Get a list of all team members
  async findAllTeamMembers(brandId: string) {
    const { data, error } = await this.supabaseClient
      .from('team')
      .select('*')
      .eq('brand_id', brandId);

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }

  async sendInvitationEmail() {
    // Optionally, add a redirect URL where invited users are sent after accepting the invite.
    const { data, error } =
      await this.supabaseClientAdmin.auth.admin.inviteUserByEmail(
        'bardiaa380@gmail.com',
        {
          redirectTo: 'http://localhost:3000/signup', // update with your app's URL
        },
      );

    if (error) {
      console.error('Error sending invitation:', error);
      return { error };
    }
    console.log('Invitation sent successfully:', data);
    return { data };
  }
}
