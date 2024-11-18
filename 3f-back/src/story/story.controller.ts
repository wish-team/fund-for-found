import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StoryService } from './story.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';
import { Story } from './entities/story.entity';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Post(':brandId/stories')
  async createStory(
    @Param('brandId') brandId: string,
    @Body() createStoryDto: CreateStoryDto,
  ): Promise<Story> {
    return this.storyService.create(brandId, createStoryDto);
  }

  @Get(':brandId/stories')
  async getBrandStories(@Param('brandId') brandId: string): Promise<Story[]> {
    return this.storyService.findByBrandId(brandId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    return this.storyService.update(+id, updateStoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storyService.remove(+id);
  }
}
