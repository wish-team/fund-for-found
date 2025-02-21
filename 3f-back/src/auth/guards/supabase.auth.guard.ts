import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseAuthGuard } from 'nestjs-supabase-js';

@Injectable()
export class MyAuthGuard extends BaseSupabaseAuthGuard {
  public constructor(supabaseClient: SupabaseClient) {
    super(supabaseClient);
  }

  protected extractTokenFromRequest(request: Request): string | undefined {
    const access_token = request.headers['authorization'].split(' ')[1];
    const refresh_token = request.headers['refresh-token'] || '';
    this.supabaseClient.auth.setSession({
      access_token,
      refresh_token,
    });
    console.log('access_token', access_token);
    console.log('refresh_token', refresh_token);
    return access_token;
  }
}
