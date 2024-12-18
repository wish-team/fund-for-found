import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { SupabaseAuthGuard } from 'src/guards/owner.guard';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [BrandsController],
  providers: [
    BrandsService,
    {
      provide: 'AUTH_GUARD',
      useClass: SupabaseAuthGuard,
    },
  ],
})
export class BrandsModule {}
