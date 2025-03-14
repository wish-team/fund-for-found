import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  @Post('store-tokens')
  async storeTokens(
    @Body() body: { accessToken: string; refreshToken: string; user: any },
    @Res() res: Response,
  ) {
    if (!body.accessToken || !body.refreshToken) {
      throw new HttpException('Invalid session data', HttpStatus.BAD_REQUEST);
    }
    // Set cookies
    res.cookie('access_token_nestjs', body.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 15,
    });
    res.cookie('refresh_token_nestjs', body.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    const safeUser = {
      id: body.user?.id,
      email: body.user?.email,
    };

    return res.status(200).json({ success: true, user: safeUser });
  }

  @Get('check-tokens')
  checkTokens(@Req() req: Request) {
    return { message: 'Received cookies', cookies: req.cookies };
  }
}
