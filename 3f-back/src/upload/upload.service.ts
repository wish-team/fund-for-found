import { Injectable, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { InjectSupabaseClient } from 'nestjs-supabase-js';

@Injectable()
export class UploadService {
  constructor(
    @InjectSupabaseClient('connection1')
    private readonly supabaseClient: SupabaseClient,
  ) {}

  // HELPERS

  // GET BUCKER AND FOLDER BASED ON ENTITY AND FOLDER TYPE
  private getBucketAndFolder(entity: string, type?: string) {
    const bucket = 'assets';
    let folder = '';

    switch (entity) {
      case 'brand':
        folder =
          type === 'main' ? 'brand/main_image' : `brand/background_image`;
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
    const columnName = type ? `${type}_image` : `${entity}_image`;
    const { error } = await this.supabaseClient
      .from(entity)
      .update({ [columnName]: imageUrl })
      .eq('brand_id', brandId);

    if (error)
      throw new Error(`Failed to update ${entity} table: ${error.message}`);
  }

  // DELETE TABLE IMAGE URL BASED ON ENTITY AND BRAND ID AND TYPE
  private async deleteTableImageUrl(
    entity: string,
    brandId: string,
    type: string,
  ) {
    const columnName = type ? `${type}_image` : `${entity}_image`;
    const { error } = await this.supabaseClient
      .from(entity)
      .update({ [columnName]: null })
      .eq('brand_id', brandId);

    if (error)
      throw new Error(`Failed to update ${entity} table: ${error.message}`);

    return { message: 'Image deleted successfully' };
  }

  // FETCH PUBLIC URL BASED ON BUCKET AND FILE PATH
  private getPublicUrl(bucket: string, filePath: string) {
    return this.supabaseClient.storage.from(bucket).getPublicUrl(filePath).data
      .publicUrl;
  }

  // MAIN FUNCTIONS

  // GET  /upload/:entity/:brandId/:type
  async getImageWithType(entity: string, brandId: string, type: string) {
    const { bucket, folder } = this.getBucketAndFolder(entity, type);
    const { data, error } = await this.supabaseClient.storage
      .from(bucket)
      .list(folder);

    if (error) throw new Error(`Failed to list files: ${error.message}`);

    const file = data.find((file) => file.name.startsWith(brandId));
    if (!file) throw new NotFoundException('Image not found');

    return this.getPublicUrl(bucket, `${folder}/${file.name}`);
  }

  // GET  /upload/:entity/:brandId
  async getImageWithoutType(entity: string, brandId: string) {
    const { bucket, folder } = this.getBucketAndFolder(entity);
    const { data, error } = await this.supabaseClient.storage
      .from(bucket)
      .list(folder);

    if (error) throw new Error(`Failed to list files: ${error.message}`);

    const file = data.find((file) => file.name.startsWith(brandId));
    if (!file) throw new NotFoundException('Image not found');

    return this.getPublicUrl(bucket, `${folder}/${file.name}`);
  }

  // POST  /upload/:entity/:brandId/:type
  async uploadImageWithType(
    entity: string,
    brandId: string,
    type: string,
    file: Express.Multer.File,
  ) {
    const { bucket, folder } = this.getBucketAndFolder(entity, type);
    const filePath = `${folder}/${brandId}.jpg`;
    const { error } = await this.supabaseClient.storage
      .from(bucket)
      .upload(filePath, file.buffer, { cacheControl: '3600', upsert: false });
    if (error) throw new Error(`Upload failed: ${error.message}`);
    const publicUrl = this.getPublicUrl(bucket, filePath);
    await this.updateTableImageUrl(entity, brandId, type, publicUrl);
    return publicUrl;
  }

  // POST  /upload/:entity/:brandId
  async uploadImageWithoutType(
    entity: string,
    brandId: string,
    file: Express.Multer.File,
  ) {
    const { bucket, folder } = this.getBucketAndFolder(entity);
    const filePath = `${folder}/${brandId}`;
    const { error } = await this.supabaseClient.storage
      .from(bucket)
      .upload(filePath, file.buffer, { cacheControl: '3600', upsert: false });
    if (error) throw new Error(`Upload failed: ${error.message}`);
    const publicUrl = this.getPublicUrl(bucket, filePath);
    await this.updateTableImageUrl(entity, brandId, undefined, publicUrl);
    return publicUrl;
  }

  // PUT  /upload/:entity/:brandId/:type
  async updateImageWithType(
    entity: string,
    brandId: string,
    type: string,
    file: Express.Multer.File,
  ) {
    await this.deleteImageWithType(entity, brandId, type);
    return this.uploadImageWithType(entity, brandId, type, file);
  }

  // PUT  /upload/:entity/:brandId/:type
  async updateImageWithoutType(
    entity: string,
    brandId: string,
    file: Express.Multer.File,
  ) {
    await this.deleteImageWithoutType(entity, brandId);
    return this.uploadImageWithoutType(entity, brandId, file);
  }

  // DELETE  /upload/:entity/:brandId/:type
  async deleteImageWithType(entity: string, brandId: string, type: string) {
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

  // DELETE  /upload/:entity/:brandId
  async deleteImageWithoutType(entity: string, brandId: string) {
    const { bucket, folder } = this.getBucketAndFolder(entity);

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
    await this.deleteTableImageUrl(entity, brandId, undefined);
  }
}
