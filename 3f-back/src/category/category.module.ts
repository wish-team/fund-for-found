import { Module } from '@nestjs/common';
import { SupabaseModule } from 'nestjs-supabase-js';
import { SupabaseAuthGuard } from 'src/guards/owner.guard';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  imports: [SupabaseModule.injectClient()],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    {
      provide: 'AUTH_GUARD',
      useClass: SupabaseAuthGuard,
    },
  ],
})
export class CategoryModule {}
