import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { SupabaseModule } from 'nestjs-supabase-js';
import { UploadService } from './upload.service';

@Module({
  imports: [SupabaseModule.injectClient('connection1')],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
