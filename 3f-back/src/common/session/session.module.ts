import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SupabaseModule } from 'nestjs-supabase-js';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
