import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

export class CreateImpactDto {
  @IsString()
  @IsNotEmpty()
  text: string; // Unique text for the impact

  @IsInt()
  @Min(1)
  priority: number; // Integer priority, minimum value is 1
}
