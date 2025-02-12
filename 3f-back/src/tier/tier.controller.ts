import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  ValidationPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { TierService } from './tier.service';
import { CreateTierDto } from './dto/create-tier.dto';
import { UpdateTierDto } from './dto/update-tier.dto';
import { MyAuthGuard } from 'src/auth/guards/supabase.auth.guard';

@Controller('tier')
export class TierController {
  constructor(private readonly tierService: TierService) {}

  // GET /tier/:brandId - Get all tiers for a specific brand
  @Get(':brandId')
  findOne(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return this.tierService.findAll(brandId);
  }

  // POST /tier/:brandId - Create a new tier
  @UseGuards(MyAuthGuard)
  @Post(':brandId')
  create(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Body(ValidationPipe) createTierDto: CreateTierDto,
  ) {
    return this.tierService.create(brandId, createTierDto);
  }

  // PUT /tier/:tierId - Update a specific tier
  @UseGuards(MyAuthGuard)
  @Patch(':tierId')
  update(
    @Param('tierId', ParseUUIDPipe) tierId: string,
    @Body(ValidationPipe) updateTierDto: UpdateTierDto,
  ) {
    return this.tierService.update(tierId, updateTierDto);
  }

  // DELETE /tier/:tierId - Delete a specific tier
  @UseGuards(MyAuthGuard)
  @Delete(':tierId')
  delete(@Param('tierId', ParseUUIDPipe) tierId: string) {
    return this.tierService.delete(tierId);
  }
}
