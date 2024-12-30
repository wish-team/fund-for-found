import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SessionService } from '../session/session.service';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly sessionService: SessionService) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    const accessToken = req.cookies['access_token'];
    const refreshToken = req.cookies['refresh_token'];

    if (accessToken && refreshToken) {
      try {
        await this.sessionService.setSession(accessToken, refreshToken);
      } catch (error) {
        console.error('Failed to set session:', error.message);
      }
    }

    next();
  }
}
