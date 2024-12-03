import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { supabase } from '../../utils/supabase/client'; // Adjust the path to your Supabase client

@Injectable()
export class OwnerGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id; // User info from middleware
    const brandId = request.params.brandId;

    const { data, error } = await supabase
      .from('BRAND')
      .select('OWNER_ID')
      .eq('BRAND_ID', brandId)
      .single();

    if (error || data?.OWNER_ID !== userId) {
      throw new ForbiddenException('You do not own this brand');
    }

    return true;
  }
}
