import { Injectable } from '@nestjs/common';
import { CreateCryptoWalletDto } from './dto/create-crypto-wallet.dto';
import { UpdateCryptoWalletDto } from './dto/update-crypto-wallet.dto';

@Injectable()
export class CryptoWalletService {
  create(createCryptoWalletDto: CreateCryptoWalletDto) {
    return 'This action adds a new cryptoWallet';
  }

  findAll() {
    return `This action returns all cryptoWallet`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cryptoWallet`;
  }

  update(id: number, updateCryptoWalletDto: UpdateCryptoWalletDto) {
    return `This action updates a #${id} cryptoWallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} cryptoWallet`;
  }
}
