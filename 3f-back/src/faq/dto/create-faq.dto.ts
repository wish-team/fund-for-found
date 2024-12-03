import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty()
  text: string; // FAQ text

  @IsInt()
  @IsNotEmpty()
  priority: number; // FAQ priority
}
