import {
  Controller,
  Get,
  Post,
  Put,
  Req,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { TierService } from './tier.service';
import { CreateTierDto } from './dto/create-tier.dto';
import { UpdateTierDto } from './dto/update-tier.dto';

@Controller('tiers')
export class TierController {
  constructor(private readonly tierService: TierService) {}

  // GET /tiers - Get a list of all tiers
  @Get()
  findAll() {
    return this.tierService.findAll();
  }

  // GET /tiers/:tier_id - Get details of a specific tier
  @Get(':tier_id')
  findOne(@Param('tier_id', ParseUUIDPipe) tier_id: string) {
    return this.tierService.findOne(tier_id);
  }

  // POST /tiers - Create a new tier

  @Post()
  create(
    @Req() request: any,
    @Body(ValidationPipe) createTierDto: CreateTierDto,
  ) {
    const userId = request.user?.id;
    return this.tierService.create({ ...createTierDto, brand_id: userId });
  }

  // PUT /tiers/:tier_id - Update a specific tier

  @Put(':tier_id')
  update(
    @Param('tier_id', ParseUUIDPipe) tier_id: string,
    @Body(ValidationPipe) updateTierDto: UpdateTierDto,
  ) {
    return this.tierService.update(tier_id, updateTierDto);
  }

  // DELETE /tiers/:tier_id - Delete a specific tier

  @Delete(':tier_id')
  delete(@Param('tier_id', ParseUUIDPipe) tier_id: string) {
    return this.tierService.delete(tier_id);
  }
}
