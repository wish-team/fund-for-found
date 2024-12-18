import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { SupabaseAuthGuard } from 'src/guards/owner.guard';

@Controller('brands/:brandId/teams')
export class TeamsController {
  constructor(private readonly teamService: TeamsService) {}

  // GET /brands/:brandId/teams - Get all team members for a specific brand
  @UseGuards(SupabaseAuthGuard)
  @Get()
  findAll(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return this.teamService.findAllByBrandId(brandId);
  }

  // POST /brands/:brandId/teams - Add a new team member to a brand
  @UseGuards(SupabaseAuthGuard)
  @Post()
  create(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Body(ValidationPipe) createTeamDto: CreateTeamDto,
  ) {
    return this.teamService.create(brandId, createTeamDto);
  }

  // PATCH /brands/:brandId/teams/:userId - Update the role of a specific team member for a brand
  @UseGuards(SupabaseAuthGuard)
  @Patch(':userId')
  update(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body(ValidationPipe) updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamService.update(brandId, userId, updateTeamDto);
  }

  // DELETE /brands/:brandId/teams/:userId - Remove a specific team member from a brand
  @UseGuards(SupabaseAuthGuard)
  @Delete(':userId')
  delete(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('userId', ParseUUIDPipe) userId: string,
  ) {
    return this.teamService.delete(brandId, userId);
  }
}
