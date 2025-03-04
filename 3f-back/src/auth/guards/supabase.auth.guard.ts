import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseSupabaseAuthGuard } from 'nestjs-supabase-js';
import { Request } from 'express';
import { jwtDecode } from 'jwt-decode'; // Requires "esModuleInterop": true in tsconfig.json

@Injectable()
export class MyAuthGuard extends BaseSupabaseAuthGuard {
  constructor(supabaseClient: SupabaseClient) {
    super(supabaseClient);
  }

  protected extractTokenFromRequest(request: Request): string | undefined {
    const cookie = request.cookies;
    const header = request.headers.cookie;
    const cookies = cookie ?? header;
    const part0 = cookies['sb-ginjmrvsyfbvxccpdqhq-auth-token.0'];
    const part1 = cookies['sb-ginjmrvsyfbvxccpdqhq-auth-token.1'];
    const part2 = cookies['sb-ginjmrvsyfbvxccpdqhq-auth-token'];
    // If neither the Google parts nor the email token is available, return undefined.
    if (!((part0 && part1) || part2)) {
      return undefined;
    }

    // Use the concatenation of part0 and part1 if both exist, otherwise use part2.
    const combined = part0 && part1 ? part0 + part1 : part2;

    const token = combined.startsWith('base64-') ? combined.slice(7) : combined;

    const decoded: any = jwtDecode(token, { header: true });

    this.supabaseClient.auth.setSession({
      access_token: decoded.access_token,
      refresh_token: decoded.refresh_token,
    });

    return decoded.access_token;
  }
}
