import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  ValidationPipe,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { SocialMediaService } from './social-media.service';
import { CreateSocialMediaDto } from './dto/create-social-media.dto';
import { UpdateSocialMediaDto } from './dto/update-social-media.dto';
import { MyAuthGuard } from 'src/auth/guards/supabase.auth.guard';
// Adjust if the guard is specific to the social media module

@Controller('social_media')
export class SocialMediaController {
  constructor(private readonly socialMediaService: SocialMediaService) {}

  // GET /social-media/:id - Get all social media link by brand_id
  @Get(':id')
  findAll(@Param('id', ParseUUIDPipe) id: string) {
    return this.socialMediaService.findAll(id);
  }

  // POST /social-media - Create a new social media link
  @UseGuards(MyAuthGuard)
  @Post(':id')
  create(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) createSocialMediaDto: CreateSocialMediaDto,
  ) {
    return this.socialMediaService.create(id, createSocialMediaDto);
  }

  // PUT /social-media/:id - Update a specific social media link
  @UseGuards(MyAuthGuard)
  @Patch(':smId')
  update(
    @Param('smId', ParseUUIDPipe) smId: string,
    @Body(ValidationPipe) updateSocialMediaDto: UpdateSocialMediaDto,
  ) {
    return this.socialMediaService.update(smId, updateSocialMediaDto);
  }

  // DELETE /social-media/:id - Delete a specific social media link
  @UseGuards(MyAuthGuard)
  @Delete(':smId')
  delete(@Param('smId', ParseUUIDPipe) smId: string) {
    return this.socialMediaService.delete(smId);
  }
}
