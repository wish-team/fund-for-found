import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CryptoTransactionService } from './crypto-transaction.service';
import { CreateCryptoTransactionDto } from './dto/create-crypto-transaction.dto';
import { UpdateCryptoTransactionDto } from './dto/update-crypto-transaction.dto';

@Controller('crypto-transaction')
export class CryptoTransactionController {
  constructor(
    private readonly cryptoTransactionService: CryptoTransactionService,
  ) {}

  @Post()
  create(@Body() createCryptoTransactionDto: CreateCryptoTransactionDto) {
    return this.cryptoTransactionService.create(createCryptoTransactionDto);
  }

  @Get()
  findAll() {
    return this.cryptoTransactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cryptoTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCryptoTransactionDto: UpdateCryptoTransactionDto,
  ) {
    return this.cryptoTransactionService.update(
      +id,
      updateCryptoTransactionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cryptoTransactionService.remove(+id);
  }
}
