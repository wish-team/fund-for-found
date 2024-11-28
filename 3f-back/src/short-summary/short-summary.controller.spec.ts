import { Test, TestingModule } from '@nestjs/testing';
import { ShortSummaryController } from './short-summary.controller';
import { ShortSummaryService } from './short-summary.service';

describe('ShortSummaryController', () => {
  let controller: ShortSummaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShortSummaryController],
      providers: [ShortSummaryService],
    }).compile();

    controller = module.get<ShortSummaryController>(ShortSummaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
