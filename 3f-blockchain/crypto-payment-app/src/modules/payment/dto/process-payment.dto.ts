import { IsString } from 'class-validator';

export class ProcessPaymentDto {
  @IsString()
  transactionHash: string;
}
