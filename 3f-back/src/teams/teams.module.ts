import { Module } from '@nestjs/common';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { SupabaseModule } from 'nestjs-supabase-js';
import { SupabaseAuthGuard } from 'src/guards/owner.guard';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [TeamsController],
  providers: [
    TeamsService,
    {
      provide: 'AUTH_GUARD',
      useClass: SupabaseAuthGuard,
    },
  ],
})
export class TeamsModule {}
