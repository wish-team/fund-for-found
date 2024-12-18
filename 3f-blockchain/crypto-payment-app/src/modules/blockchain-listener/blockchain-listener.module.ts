import { Module } from '@nestjs/common';
import { BlockchainListenerService } from './blockchain-listener.service';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [SupabaseModule], // Import Supabase for DB operations
  providers: [BlockchainListenerService],
  exports: [BlockchainListenerService],
})
export class BlockchainListenerModule {}
