import {
  Controller,
  Get,
  Post,
  Req,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  ValidationPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { MyAuthGuard } from 'src/auth/guards/supabase.auth.guard';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  // GET /team/:brandId - Get a list of all team members
  @Get(':brandId')
  findAllTeamMembers(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return this.teamService.findAllTeamMembers(brandId);
  }

  // @UseGuards(MyAuthGuard)
  @Post()
  sendInvitationEmail() {
    return this.teamService.sendInvitationEmail();
  }
}
