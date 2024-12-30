import { Injectable, Scope } from '@nestjs/common';
import { AuthSession, SupabaseClient } from '@supabase/supabase-js';

@Injectable({ scope: Scope.REQUEST })
export class SessionService {
  private supabaseSession: AuthSession | null = null;

  constructor(private readonly supabaseClient: SupabaseClient) {}

  async setSession(accessToken: string, refreshToken: string): Promise<void> {
    const { data, error } = await this.supabaseClient.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (error) {
      throw new Error(`Failed to set session: ${error.message}`);
    }

    this.supabaseSession = data.session;
  }

  getSession(): AuthSession | null {
    return this.supabaseSession;
  }

  async getCurrentUser() {
    const { data, error } = await this.supabaseClient.auth.getUser();
    if (error) {
      throw new Error(`Failed to get current user: ${error.message}`);
    }
    return data.user;
  }
}
