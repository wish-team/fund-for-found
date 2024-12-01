import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentRequestDto } from './dto/payment-request.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Endpoint to process a payment
   * @param paymentRequestDto The payment request payload
   * @returns Result of the payment processing
   */
  @Post('process')
  async processPayment(@Body() paymentRequestDto: PaymentRequestDto) {
    try {
      const result =
        await this.paymentService.processPayment(paymentRequestDto);
      return {
        success: true,
        data: result,
        message: 'Payment processed successfully!',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
