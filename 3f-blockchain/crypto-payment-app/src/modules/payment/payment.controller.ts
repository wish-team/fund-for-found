// src/modules/payment/payment.controller.ts
import {
  Controller,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ProcessPaymentDto } from './dto/process-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Endpoint to initiate payment by generating a new wallet address for the user.
   */
  @Post('initiate/:brandId')
  async initiatePayment(@Param('brandId') brandId: number) {
    try {
      const uniqueIndex = Math.floor(Math.random() * 1000000); // Generate or fetch a unique index
      const result = await this.paymentService.initiatePayment(
        brandId,
        uniqueIndex,
      );
      return { success: true, ...result };
    } catch (error) {
      throw new HttpException(
        `Failed to initiate payment: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Endpoint to process the payment once funds are received.
   */
  @Post('process')
  async processPayment(@Body() processPaymentDto: ProcessPaymentDto) {
    try {
      const result = await this.paymentService.processPayment(
        processPaymentDto.transactionHash,
      );
      return { success: true, ...result };
    } catch (error) {
      throw new HttpException(
        `Failed to process payment: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
