import { Test, TestingModule } from '@nestjs/testing';
import { BrandTagService } from './brand-tag.service';

describe('BrandTagService', () => {
  let service: BrandTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandTagService],
    }).compile();

    service = module.get<BrandTagService>(BrandTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
