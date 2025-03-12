import { Module } from '@nestjs/common';

import { SupabaseModule } from 'nestjs-supabase-js';
import { MyAuthGuard } from './guards/supabase.auth.guard';
@Module({
  imports: [SupabaseModule.injectClient('connection1')],
  controllers: [],
  providers: [MyAuthGuard],
})
export class AuthModule {}
