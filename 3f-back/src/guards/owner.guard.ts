import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseAuthGuard } from 'nestjs-supabase-js';

@Injectable()
export class SupabaseAuthGuard extends BaseSupabaseAuthGuard {
  protected readonly supabaseClient: SupabaseClient;

  constructor(supabaseClient: SupabaseClient) {
    super(supabaseClient);
    this.supabaseClient = supabaseClient;
  }

  // Extract the Bearer token from the Authorization header
  protected extractTokenFromRequest(request: Request): string | undefined {
    const authHeader = request.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      return token;
    }

    return undefined;
  }

  // Validate the token and return user info
  protected async validateAccessToken(token: string) {
    const { data, error } = await this.supabaseClient.auth.getUser(token);

    if (error) {
      console.error('Token validation failed:', error.message);
      return null;
    }

    console.log('Validated User:', data.user);
    return data.user; // User info is returned if the token is valid
  }
}
