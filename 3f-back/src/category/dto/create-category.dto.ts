import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  brand_id: string; // Foreign key to the brand table

  @IsString()
  @IsNotEmpty()
  category_name: string; // The name of the category
}
