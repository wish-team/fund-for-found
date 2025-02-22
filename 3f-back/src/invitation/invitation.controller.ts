import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { Request } from 'express';

@Controller('invitations')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Post('send')
  async sendInvitation(
    @Body('email') email: string,
    @Body('brand_id') brandId: string,
  ) {
    if (!email || !brandId)
      throw new BadRequestException('Email and brand_id are required.');
    return this.invitationService.createInvitation(email, brandId);
  }

  @Get('accept')
  async acceptInvitation(@Query('token') token: string, @Req() req: Request) {
    const user = req.user; // Assuming authentication middleware attaches user info
    if (!user)
      throw new BadRequestException(
        'You must be logged in to accept an invitation.',
      );
    return this.invitationService.acceptInvitation(token, user);
  }
}
