import { Test, TestingModule } from '@nestjs/testing';
import { CryptoTransactionService } from './crypto-transaction.service';

describe('CryptoTransactionService', () => {
  let service: CryptoTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CryptoTransactionService],
    }).compile();

    service = module.get<CryptoTransactionService>(CryptoTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
