import { Test, TestingModule } from '@nestjs/testing';
import { BrandDonationController } from './brand-donation.controller';
import { BrandDonationService } from './brand-donation.service';

describe('BrandDonationController', () => {
  let controller: BrandDonationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandDonationController],
      providers: [BrandDonationService],
    }).compile();

    controller = module.get<BrandDonationController>(BrandDonationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
