import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SupabaseModule } from 'nestjs-supabase-js';
import { MyAuthGuard } from './guards/supabase.auth.guard';
@Module({
  imports: [SupabaseModule.injectClient('connection1')],
  controllers: [AuthController],
  providers: [MyAuthGuard],
})
export class AuthModule {}
