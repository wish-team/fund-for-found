import { Test, TestingModule } from '@nestjs/testing';
import { IndividualDonationService } from './individual-donation.service';

describe('IndividualDonationService', () => {
  let service: IndividualDonationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IndividualDonationService],
    }).compile();

    service = module.get<IndividualDonationService>(IndividualDonationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
