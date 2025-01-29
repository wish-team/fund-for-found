import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Controller('address')
export class PaymentController {
  constructor() {}
  @Get('wallet')
  async getUserWallet() {}

  @Get('generated')
}
