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
import { CreateTeamDto } from './dto/create-team.dto';
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  // GET /team/:brandId - Get a list of all team members
  @Get(':brandId')
  findAllTeamMembers(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return this.teamService.findAllTeamMembers(brandId);
  }

  @UseGuards(MyAuthGuard)
  @Post(':brandId/invite')
  sendInvitationEmail(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Body(ValidationPipe) createTeamDto: CreateTeamDto,
    @Req() request: any,
  ) {
    const userId = request.user.id;
    return this.teamService.sendInvitationEmail(createTeamDto, brandId, userId);
  }

  @Post('webhook/user-signup')
  handleUserSignup(@Body() payload: any) {
    console.log('here');
    return this.teamService.handleUserSignup(payload);
  }
}
