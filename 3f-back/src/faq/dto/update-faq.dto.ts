import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateFaqDto {
  @IsString()
  @IsOptional()
  text?: string; // Optional updated text

  @IsInt()
  @IsOptional()
  priority?: number; // Optional updated priority
}
