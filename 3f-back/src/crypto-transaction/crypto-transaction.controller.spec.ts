import { Test, TestingModule } from '@nestjs/testing';
import { CryptoTransactionController } from './crypto-transaction.controller';
import { CryptoTransactionService } from './crypto-transaction.service';

describe('CryptoTransactionController', () => {
  let controller: CryptoTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoTransactionController],
      providers: [CryptoTransactionService],
    }).compile();

    controller = module.get<CryptoTransactionController>(
      CryptoTransactionController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
