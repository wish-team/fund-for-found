import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { createClient } from '../../../3f-auth/utils/supabase/server';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const supabase = createClient(); // Use the createClient from 3f-auth
      const authHeader = req.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException(
          'Missing or invalid Authorization header',
        );
      }

      const accessToken = authHeader.split(' ')[1];

      // Validate token and fetch user session
      const { data, error } = await supabase.auth.getUser(accessToken);

      if (error || !data?.user) {
        throw new UnauthorizedException('Invalid or expired token');
      }

      // Attach user to request for further use
      req['user'] = data.user;

      next();
    } catch (error) {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
