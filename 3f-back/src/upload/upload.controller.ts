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
  async getImageWithType(
    @Param('entity') entity: EntityType,
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('type') type: string,
  ) {
    return this.uploadService.getImageWithType(entity, brandId, type);
  }

  // GET  /upload/:entity/:brandId
  @Get(':entity/:brandId')
  async getImageWithoutType(
    @Param('entity') entity: EntityType,
    @Param('brandId', ParseUUIDPipe) brandId: string,
  ) {
    return this.uploadService.getImageWithoutType(entity, brandId);
  }

  // POST  /upload/:entity/:brandId/:type
  @UseGuards(MyAuthGuard)
  @Post(':entity/:brandId/:type')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageWithType(
    @Param('entity') entity: EntityType,
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('type') type: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    return this.uploadService.uploadImageWithType(entity, brandId, type, file);
  }

  // POST  /upload/:entity/:brandId
  @UseGuards(MyAuthGuard)
  @Post(':entity/:brandId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImageWithoutType(
    @Param('entity') entity: EntityType,
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    return this.uploadService.uploadImageWithoutType(entity, brandId, file);
  }

  // PUT  /upload/:entity/:brandId/:type
  @UseGuards(MyAuthGuard)
  @Put(':entity/:brandId/:type')
  @UseInterceptors(FileInterceptor('file'))
  async updateImageWithType(
    @Param('entity') entity: EntityType,
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('type') type: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    return this.uploadService.updateImageWithType(entity, brandId, type, file);
  }

  // PUT  /upload/:entity/:brandId
  @UseGuards(MyAuthGuard)
  @Put(':entity/:brandId')
  @UseInterceptors(FileInterceptor('file'))
  async updateImageWithoutType(
    @Param('entity') entity: EntityType,
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded');
    return this.uploadService.updateImageWithoutType(entity, brandId, file);
  }

  // DELETE  /upload/:entity/:brandId/:type
  @UseGuards(MyAuthGuard)
  @Delete(':entity/:brandId/:type')
  async deleteImageWithType(
    @Param('entity') entity: EntityType,
    @Param('brandId', ParseUUIDPipe) brandId: string,
    @Param('type') type: string,
  ) {
    return this.uploadService.deleteImageWithType(entity, brandId, type);
  }

  // DELETE  /upload/:entity/:brandId
  @UseGuards(MyAuthGuard)
  @Delete(':entity/:brandId')
  async deleteImage(
    @Param('entity') entity: EntityType,
    @Param('brandId', ParseUUIDPipe) brandId: string,
  ) {
    return this.uploadService.deleteImageWithoutType(entity, brandId);
  }
}
