import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CryptoWalletService } from './crypto-wallet.service';
import { CreateCryptoWalletDto } from './dto/create-crypto-wallet.dto';
import { UpdateCryptoWalletDto } from './dto/update-crypto-wallet.dto';

@Controller('crypto-wallet')
export class CryptoWalletController {
  constructor(private readonly cryptoWalletService: CryptoWalletService) {}

  @Post()
  create(@Body() createCryptoWalletDto: CreateCryptoWalletDto) {
    return this.cryptoWalletService.create(createCryptoWalletDto);
  }

  @Get()
  findAll() {
    return this.cryptoWalletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cryptoWalletService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCryptoWalletDto: UpdateCryptoWalletDto,
  ) {
    return this.cryptoWalletService.update(+id, updateCryptoWalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cryptoWalletService.remove(+id);
  }
}
