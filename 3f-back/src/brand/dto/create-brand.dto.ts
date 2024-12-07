// dto/create-brand.dto.ts
export class CreateBrandDto {
  readonly brand_name: string;
  readonly owner_id: string;
  readonly brand_image?: string;
}
