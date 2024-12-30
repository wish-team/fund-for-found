import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { UsersController } from './users.controller';

import { UsersService } from './users.service';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
