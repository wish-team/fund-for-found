import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class UploadService {
  constructor(private readonly supabaseClient: SupabaseClient) {}

  // GET BUCKER AND FOLDER BASED ON ENTITY AND FOLDER TYPE
  private getBucketAndFolder(entity: string, type: string) {
    const bucket = 'assets';
    let folder = '';

    switch (entity) {
      case 'brand':
        folder = type === 'main' ? 'brand/main_image' : `brand/${type}`;
        break;
      case 'tier':
        folder = 'tier';
        break;
      case 'user':
        folder = 'user';
        break;
      default:
        throw new Error(`Unknown entity type: ${entity}`);
    }

    return { bucket, folder };
  }

  // UPDATE TABLE IMAGE URL BASED ON ENTITY AND BRAND ID
  private async updateTableImageUrl(
    entity: string,
    brandId: string,
    type: string,
    imageUrl: string,
  ) {
    const columnName = `${type}_image`;
    const { error } = await this.supabaseClient
      .from(entity)
      .update({ [columnName]: imageUrl })
      .eq('brandId', brandId);

    if (error)
      throw new Error(`Failed to update ${entity} table: ${error.message}`);
  }

  // DELETE TABLE IMAGE URL BASED ON ENTITY AND BRAND ID AND TYPE
  private async deleteTableImageUrl(
    entity: string,
    brandId: string,
    type: string,
  ) {
    const columnName = `${type}_image`;
    const { error } = await this.supabaseClient
      .from(entity)
      .update({ [columnName]: null })
      .eq('brandId', brandId);

    if (error)
      throw new Error(`Failed to update ${entity} table: ${error.message}`);

    return { message: 'Image deleted successfully' };
  }

  // GET  /upload/:entity/:brandId/:type
  async getImage(entity: string, brandId: string, type: string) {
    const { bucket, folder } = this.getBucketAndFolder(entity, type);
    const { data, error } = await this.supabaseClient.storage
      .from(bucket)
      .list(folder);

    if (error) throw new Error(`Failed to list files: ${error.message}`);

    const file = data.find((file) => file.name.startsWith(brandId));
    if (!file) throw new NotFoundException('Image not found');

    return this.getPublicUrl(bucket, `${folder}/${file.name}`);
  }

  private getPublicUrl(bucket: string, filePath: string) {
    return this.supabaseClient.storage.from(bucket).getPublicUrl(filePath).data
      .publicUrl;
  }

  // POST  /upload/:entity/:brandId/:type
  async uploadImage(
    entity: string,
    brandId: string,
    type: string,
    file: Express.Multer.File,
  ) {
    const { bucket, folder } = this.getBucketAndFolder(entity, type);
    const filePath = `${folder}/${brandId}-${Date.now()}-${file.originalname}`;
    const { error } = await this.supabaseClient.storage
      .from(bucket)
      .upload(filePath, file.buffer, { cacheControl: '3600', upsert: false });
    if (error) throw new Error(`Upload failed: ${error.message}`);
    const publicUrl = this.getPublicUrl(bucket, filePath);
    await this.updateTableImageUrl(entity, brandId, type, publicUrl);
    return publicUrl;
  }

  // PUT  /upload/:entity/:brandId/:type
  async updateImage(
    entity: string,
    brandId: string,
    type: string,
    file: Express.Multer.File,
  ) {
    await this.deleteImage(entity, brandId, type);
    return this.uploadImage(entity, brandId, type, file);
  }

  // DELETE  /upload/:entity/:brandId/:type
  async deleteImage(entity: string, brandId: string, type: string) {
    const { bucket, folder } = this.getBucketAndFolder(entity, type);

    const { data, error } = await this.supabaseClient.storage
      .from(bucket)
      .list(folder);

    if (error) throw new Error(`Failed to list files: ${error.message}`);

    const fileToDelete = data.find((file) => file.name.startsWith(brandId));
    if (!fileToDelete) throw new NotFoundException('Image not found');

    const { error: deleteError } = await this.supabaseClient.storage
      .from(bucket)
      .remove([`${folder}/${fileToDelete.name}`]);
    if (deleteError)
      throw new Error(`Failed to delete image: ${deleteError.message}`);
    await this.deleteTableImageUrl(entity, brandId, type);
  }
}
