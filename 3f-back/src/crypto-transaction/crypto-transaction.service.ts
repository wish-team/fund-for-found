import { Injectable } from '@nestjs/common';
import { CreateCryptoTransactionDto } from './dto/create-crypto-transaction.dto';
import { UpdateCryptoTransactionDto } from './dto/update-crypto-transaction.dto';

@Injectable()
export class CryptoTransactionService {
  create(createCryptoTransactionDto: CreateCryptoTransactionDto) {
    return 'This action adds a new cryptoTransaction';
  }

  findAll() {
    return `This action returns all cryptoTransaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cryptoTransaction`;
  }

  update(id: number, updateCryptoTransactionDto: UpdateCryptoTransactionDto) {
    return `This action updates a #${id} cryptoTransaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} cryptoTransaction`;
  }
}
