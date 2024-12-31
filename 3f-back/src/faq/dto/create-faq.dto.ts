import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateFaqDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;

  @IsInt()
  @IsNotEmpty()
  priority: number;
}
