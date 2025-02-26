import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
