import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { SupabaseModule } from 'nestjs-supabase-js';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [InvitationController],
  providers: [InvitationService],
  exports: [InvitationService],
})
export class InvitationModule {}
