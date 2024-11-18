import { Test, TestingModule } from '@nestjs/testing';
import { IndividualDonationController } from './individual-donation.controller';
import { IndividualDonationService } from './individual-donation.service';

describe('IndividualDonationController', () => {
  let controller: IndividualDonationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IndividualDonationController],
      providers: [IndividualDonationService],
    }).compile();

    controller = module.get<IndividualDonationController>(
      IndividualDonationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
