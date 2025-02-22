import { Injectable, BadRequestException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import * as crypto from 'crypto';

@Injectable()
export class InvitationService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // Generate a random token
  private generateToken(): string {
    return crypto.randomBytes(20).toString('hex');
  }

  // Send an invitation
  async createInvitation(email: string, brandId: string): Promise<void> {
    const token = this.generateToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expires in 24h

    const { error } = await this.supabaseClient
      .from('invitations')
      .insert([
        { email, brand_id: brandId, token, expiresAt, accepted: false },
      ]);
    if (error) throw new BadRequestException('Failed to send invitation.');

    // Send email (replace with your email service)
    const inviteUrl = `https://yourapp.com/invite/accept?token=${token}`;
    console.log(`Send this link via email: ${inviteUrl}`);
  }

  // Accept an invitation
  async acceptInvitation(
    token: string,
    user: any,
  ): Promise<{ message: string }> {
    // Find the invitation
    const { data: invitation, error } = await this.supabaseClient
      .from('invitations')
      .select('*')
      .eq('token', token)
      .single();

    if (!invitation)
      throw new BadRequestException('Invalid or expired invitation.');

    // Ensure the logged-in user is the invitee
    if (user.email !== invitation.email) {
      throw new BadRequestException('This invitation was not sent to you.');
    }

    // Mark the invitation as accepted
    await this.supabaseClient
      .from('invitations')
      .update({ accepted: true })
      .eq('token', token);

    // Add the user to the team (team table uses brand_id)
    const { error: teamError } = await this.supabaseClient
      .from('team')
      .insert([
        { user_id: user.id, brand_id: invitation.brand_id, role: 'member' },
      ]);
    if (teamError) throw new BadRequestException('Failed to add user to team.');

    return { message: 'Invitation accepted!' };
  }

  // Auto-accept invitation after signup
  async handleUserSignup(userId: string, email: string) {
    // Find pending invitation for this email
    const { data: invitation } = await this.supabaseClient
      .from('invitations')
      .select('*')
      .eq('email', email)
      .eq('accepted', false)
      .single();

    if (!invitation) return;

    // Mark invitation as accepted
    await this.supabaseClient
      .from('invitations')
      .update({ accepted: true })
      .eq('email', email);

    // Add user to the team
    await this.supabaseClient
      .from('team')
      .insert([
        { user_id: userId, brand_id: invitation.brand_id, role: 'member' },
      ]);
  }
}
