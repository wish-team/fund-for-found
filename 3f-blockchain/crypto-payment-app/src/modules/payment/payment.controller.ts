import { Controller, Post, Body, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Post('initiate/:brandId')
  async initiatePayment(
    @Param('brandId') brandId: number,
    @Body('index') uniqueIndex: number,
  ) {
    return this.paymentService.initiatePayment(brandId, uniqueIndex);
  }

  @Post('process')
  async processPayment(@Body('transactionHash') transactionHash: string) {
    return this.paymentService.processPayment(transactionHash);
  }
}
