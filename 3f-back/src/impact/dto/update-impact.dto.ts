import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class UpdateImpactDto {
  @IsString()
  @IsOptional()
  text?: string; // Optional updated text

  @IsInt()
  @Min(1)
  @IsOptional()
  priority?: number; // Optional updated priority
}
