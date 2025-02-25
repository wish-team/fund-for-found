import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { MyAuthGuard } from 'src/auth/guards/supabase.auth.guard';

@Controller('team')
export class TeamsController {
  constructor(private readonly teamService: TeamsService) {}

  // GET /team/:brandId - Get all team members for a specific brand
  @Get(':brandId')
  findAll(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return this.teamService.findAllByBrandId(brandId);
  }

  // POST /brands/:brandId/teams - Add a new team member to a brand
  @UseGuards(MyAuthGuard)
  @Post(':brandId')
  create(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Body(ValidationPipe) createTeamDto: CreateTeamDto,
  ) {
    return this.teamService.create(brandId, createTeamDto);
  }

  // PATCH /team/:teamId - Update the role of a specific team member for a brand
  @UseGuards(MyAuthGuard)
  @Patch(':teamId')
  update(
    @Param('teamId', ParseUUIDPipe) teamId: string,
    @Body(ValidationPipe) updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamService.update(teamId, updateTeamDto);
  }

  // DELETE /brands/:brandId/teams/:userId - Remove a specific team member from a brand
  @UseGuards(MyAuthGuard)
  @Delete(':teamId')
  delete(@Param('teamId', ParseUUIDPipe) teamId: string) {
    return this.teamService.delete(teamId);
  }
}
