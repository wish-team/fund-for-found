import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  ParseUUIDPipe,
  Param,
  BadRequestException,
  Delete,
  Put,
  Get,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { MyAuthGuard } from 'src/auth/guards/supabase.auth.guard';

type EntityType = 'brand' | 'user' | 'tier';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // GET  /upload/:entity/:brandId/:type
  @Get(':entity/:brandId/:type')
  async getImage(
    @Param('entity') entity: EntityType,
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('type') type: string,
  ) {
    return this.uploadService.getImage(entity, brandId, type);
  }

  // POST  /upload/:entity/:brandId/:type
  @UseGuards(MyAuthGuard)
  @Post(':entity/:brandId/:type')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Param('entity') entity: EntityType,
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('type') type: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    return this.uploadService.uploadImage(entity, brandId, type, file);
  }

  // PUT  /upload/:entity/:brandId/:type
  @UseGuards(MyAuthGuard)
  @Put(':entity/:brandId/:type')
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @Param('entity') entity: EntityType,
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('type') type: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    return this.uploadService.updateImage(entity, brandId, type, file);
  }

  // DELETE  /upload/:entity/:brandId/:type
  @UseGuards(MyAuthGuard)
  @Delete(':entity/:brandId/:type')
  async deleteImage(
    @Param('entity') entity: EntityType,
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('type') type: string,
  ) {
    return this.uploadService.deleteImage(entity, brandId, type);
  }
}
