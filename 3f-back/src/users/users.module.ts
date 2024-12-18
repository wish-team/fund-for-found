import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { UsersController } from './users.controller';
import { SupabaseAuthGuard } from 'src/guards/owner.guard';
import { UsersService } from './users.service';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'AUTH_GUARD',
      useClass: SupabaseAuthGuard,
    },
  ],
})
export class UsersModule {}
