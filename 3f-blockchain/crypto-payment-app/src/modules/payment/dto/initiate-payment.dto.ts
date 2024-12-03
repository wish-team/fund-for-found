import { IsInt } from 'class-validator';

export class InitiatePaymentDto {
  @IsInt()
  index: number;
}
