import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { SupabaseModule } from 'nestjs-supabase-js';
import { TeamService } from './team.service';

@Module({
  imports: [
    SupabaseModule.injectClient('connection1'),
    SupabaseModule.injectClient('connection2'),
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
