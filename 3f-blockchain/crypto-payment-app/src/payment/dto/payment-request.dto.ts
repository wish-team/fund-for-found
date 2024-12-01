import { IsString, IsNumber, IsOptional } from 'class-validator';

export class PaymentRequestDto {
  @IsString()
  coin: string;

  @IsString()
  network: string;

  @IsString()
  toAddress: string;

  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  apiKey?: string; // Optional for some APIs
}
