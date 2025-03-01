import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';

@Module({
  imports: [SupabaseModule.injectClient()],
  providers: [CollectionService],
  controllers: [CollectionController],
  exports: [CollectionService],
})
export class CollectionModule {}