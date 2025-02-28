import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseAuthGuard } from 'nestjs-supabase-js';

@Injectable()
export class MyAuthGuard extends BaseSupabaseAuthGuard {
  public constructor(supabaseClient: SupabaseClient) {
    super(supabaseClient);
  }

  protected extractTokenFromRequest(request: Request): string | undefined {
    let access_token: string | undefined;
    let refresh_token: string | undefined;

    // 1. Try to get the access token from the Authorization header.
    const authHeader = request.headers['authorization'];
    if (authHeader && typeof authHeader === 'string') {
      // Expected format: "Bearer <access_token>"
      access_token = authHeader.split(' ')[1];
    }

    // 2. If the access token wasn't found, fall back to cookies.
    // Note: This assumes you have a cookie parser middleware that populates `request.cookies`
    const cookies = (request as any).cookies;
    if (!access_token && cookies) {
      access_token = cookies['access_token'];
      refresh_token = cookies['refresh_token'];
    } else {
      // 3. Even if access token is in the header, try to retrieve refresh token from header as backup.
      const refreshHeader = request.headers['refresh-token'];
      if (typeof refreshHeader === 'string') {
        refresh_token = refreshHeader;
      }
    }

    // 4. Set the session on the Supabase client with the tokens we found.
    this.supabaseClient.auth.setSession({
      access_token,
      refresh_token,
    });

    return access_token;
  }
}
