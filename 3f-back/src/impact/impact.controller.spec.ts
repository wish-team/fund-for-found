import { Test, TestingModule } from '@nestjs/testing';
import { ImpactController } from './impact.controller';

describe('ImpactController', () => {
  let controller: ImpactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImpactController],
    }).compile();

    controller = module.get<ImpactController>(ImpactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
