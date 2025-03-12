import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { InjectSupabaseClient } from 'nestjs-supabase-js';
import { CreateTeamDto } from './dto/create-team.dto';

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

  async sendInvitationEmail(
    createTeamDto: CreateTeamDto,
    brandId: string,
    userId: string,
  ) {
    const { team_user_email, role, description, team_user_image } =
      createTeamDto;

    // Send invitation email
    const { data, error } =
      await this.supabaseClientAdmin.auth.admin.inviteUserByEmail(
        team_user_email,
      );

    if (error) {
      console.error('Error sending invitation:', error);
      return { error };
    }

    // Store invitation data in a new table to track pending invitations
    const { error: storeError } = await this.supabaseClient
      .from('invitation')
      .insert({
        invited_user_email: team_user_email,
        brand_id: brandId,
        role: role,
        description: description,
        team_user_image: team_user_image,
        invited_by: userId,
        status: 'pending',
      });

    if (storeError) {
      console.error('Error storing invitation data:', storeError);
      return { error: storeError };
    }

    console.log('Invitation sent successfully:', data);
    return { data };
  }

  async handleUserSignup(payload: any) {
    console.log('Webhook payload received:', payload);

    // For debugging - log the entire payload
    console.log(JSON.stringify(payload, null, 2));

    // Extract user information from the payload
    const record = payload.record;
    if (!record || !record.email) {
      console.error('Invalid webhook payload structure');
      return { error: 'Invalid payload' };
    }

    const email = record.email;

    // Check if this is a confirmation event (invited user is now confirmed)
    // This depends on exact Supabase webhook payload format
    const isConfirmation = record.confirmed_at && record.invited_at;

    if (!isConfirmation) {
      console.log('Not a confirmation event, skipping');
      return { message: 'Not a confirmation event' };
    }

    console.log(`Processing confirmation for user: ${email}`);

    // Find pending invitations for this email
    const { data: invitations, error } = await this.supabaseClient
      .from('invitation') // Use the same table name you inserted into
      .select('*')
      .eq('invited_user_email', email) // Match the column name you used
      .eq('status', 'pending');

    if (error) {
      console.error('Error fetching invitations:', error);
      return { error: 'Error fetching invitations' };
    }

    if (!invitations || invitations.length === 0) {
      console.log('No pending invitations found for:', email);
      return { error: 'No pending invitations found' };
    }

    console.log(`Found ${invitations.length} pending invitations for ${email}`);

    // For each invitation, create a team record
    for (const invitation of invitations) {
      // Get user's Supabase user ID
      const userId = record.id; // The user ID is available in the webhook payload

      console.log(
        `Creating team record for user ${userId} in brand ${invitation.brand_id}`,
      );

      // Create team record
      const { error: teamError } = await this.supabaseClient
        .from('team')
        .insert({
          brand_id: invitation.brand_id,
          user_id: userId,
          role: invitation.role,
          description: invitation.description,
          team_user_image: invitation.team_user_image,
        });

      if (teamError) {
        console.error('Error creating team record:', teamError);
        continue;
      }

      // Update invitation status
      const { error: updateError } = await this.supabaseClient
        .from('invitation') // Use the same table name
        .update({ status: 'accepted' })
        .eq('id', invitation.id);

      if (updateError) {
        console.error('Error updating invitation status:', updateError);
      } else {
        console.log(`Invitation ${invitation.id} marked as accepted`);
      }
    }

    return { success: true };
  }
}
