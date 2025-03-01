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

  // GET /social-media/:brandId - Get all social media link by brand_id
  @Get(':brandId')
  findAllSocialMedia(@Param('brandId', ParseUUIDPipe) brandId: string) {
    return this.socialMediaService.findAllSocialMedia(brandId);
  }

  // POST /social-media - Create a new social media link
  @UseGuards(MyAuthGuard)
  @Post(':brandId')
  createSocialMedia(
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Body(ValidationPipe) createSocialMediaDto: CreateSocialMediaDto[],
  ) {
    return this.socialMediaService.createSocialMedia(
      brandId,
      createSocialMediaDto,
    );
  }

  // PUT /social-media/:brandId - Update a specific social media link
  @UseGuards(MyAuthGuard)
  @Patch(':smId')
  updateSocialMedia(
    @Param('smId', ParseUUIDPipe) smId: string,
    @Body(ValidationPipe) updateSocialMediaDto: UpdateSocialMediaDto,
  ) {
    return this.socialMediaService.updateSocialMedia(
      smId,
      updateSocialMediaDto,
    );
  }

  // DELETE /social-media/:brandId - Delete a specific social media link
  @UseGuards(MyAuthGuard)
  @Delete(':smId')
  deleteSocialMedia(@Param('smId', ParseUUIDPipe) smId: string) {
    return this.socialMediaService.deleteSocialMedia(smId);
  }
}
