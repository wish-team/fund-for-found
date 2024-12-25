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
  UseGuards,
} from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';
import { SupabaseAuthGuard } from 'src/guards/owner.guard'; // Adjust if the guard is specific to the social media module

@Controller('social-media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  // GET /social-media - Get a list of all social media links
  @Get()
  findAll() {
    return this.socialMediaService.findAll();
  }

  // GET /social-media/:id - Get details of a specific social media link by brand_id
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.socialMediaService.findOne(id);
  }

  // POST /social-media - Create a new social media link
  @UseGuards(SupabaseAuthGuard)
  @Post()
  create(
    @Req() request: any,
    @Body(ValidationPipe) createSocialMediaDto: CreateSocialMediaDto,
  ) {
    const userId = request.user?.id; // Extracted securely from the token
    return this.socialMediaService.create({
      ...createSocialMediaDto,
      brand_id: userId,
    });
  }

  // PUT /social-media/:id - Update a specific social media link
  @UseGuards(SupabaseAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateSocialMediaDto: UpdateSocialMediaDto,
  ) {
    return this.socialMediaService.update(id, updateSocialMediaDto);
  }

  // DELETE /social-media/:id - Delete a specific social media link
  @UseGuards(SupabaseAuthGuard)
  @Delete(':id')
  delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.socialMediaService.delete(id);
  }
}
