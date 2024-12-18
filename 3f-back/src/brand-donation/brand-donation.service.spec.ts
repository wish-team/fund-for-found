import { Test, TestingModule } from '@nestjs/testing';
import { BrandDonationService } from './brand-donation.service';

describe('BrandDonationService', () => {
  let service: BrandDonationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandDonationService],
    }).compile();

    service = module.get<BrandDonationService>(BrandDonationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
