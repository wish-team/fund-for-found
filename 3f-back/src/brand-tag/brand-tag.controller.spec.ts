import { Test, TestingModule } from '@nestjs/testing';
import { BrandTagController } from './brand-tag.controller';
import { BrandTagService } from './brand-tag.service';

describe('BrandTagController', () => {
  let controller: BrandTagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrandTagController],
      providers: [BrandTagService],
    }).compile();

    controller = module.get<BrandTagController>(BrandTagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
