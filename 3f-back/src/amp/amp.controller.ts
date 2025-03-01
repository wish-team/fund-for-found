import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AmpService } from './amp.service';

@Controller('payment')
export class AmpController {
  constructor(private readonly ampService: AmpService) {}

  @Post('create-checkout')
  async createPayment(
    @Body() body: { amount: number; currency: string; network: string },
  ) {
    const { amount, currency, network } = body;
    try {
      const session = await this.ampService.createPayment(
        amount,
        currency,
        network,
      );
      if (session.status === 'success') {
        return {
          message: 'Checkout session created successfully!',
          paymentUrl: session.data.url,
          sessionId: session.data.sessionId,
        };
      } else {
        throw new HttpException(
          `Error creating payment session: ${session.message}`,
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        error.response?.data || error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('monitor-payment')
  async monitorPayment(@Query('sessionId') sessionId: string) {
    if (!sessionId) {
      throw new HttpException('sessionId is required', HttpStatus.BAD_REQUEST);
    }
    try {
      const result = await this.ampService.monitorPayment(sessionId);
      return {
        message: 'Payment successful!',
        transactionHash: result.data.outgoingTransactionHash,
      };
    } catch (error) {
      throw new HttpException(
        error.response?.data || error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
