import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { TeamsService } from './teams.service'; // The service stays as 'team.service'
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller('brands/:brandId/teams') // Updated to plural "teams"
export class TeamsController {
  constructor(private readonly teamService: TeamsService) {}

  // GET /brands/:brandId/teams - Get all team members for a specific brand
  @Get()
  findAll(@Param('brandId') brandId: string) {
    return this.teamService.findAllByBrandId(brandId);
  }

  // POST /brands/:brandId/teams - Add a new team member to a brand
  @Post()
  create(
    @Param('brandId') brandId: string,
    @Body(ValidationPipe) createTeamDto: CreateTeamDto,
  ) {
    return this.teamService.create(brandId, createTeamDto);
  }

  // PUT /brands/:brandId/teams/:userId - Update the role of a specific team member for a brand
  @Patch(':userId')
  update(
    @Param('brandId') brandId: string,
    @Param('userId') userId: string,
    @Body(ValidationPipe) updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamService.update(brandId, userId, updateTeamDto);
  }

  // DELETE /brands/:brandId/teams/:userId - Remove a specific team member from a brand
  @Delete(':userId')
  delete(@Param('brandId') brandId: string, @Param('userId') userId: string) {
    return this.teamService.delete(brandId, userId);
  }
}
