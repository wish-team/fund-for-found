import { Test, TestingModule } from '@nestjs/testing';
import { ShortSummaryService } from './short-summary.service';

describe('ShortSummaryService', () => {
  let service: ShortSummaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ShortSummaryService],
    }).compile();

    service = module.get<ShortSummaryService>(ShortSummaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
