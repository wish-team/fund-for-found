import { Test, TestingModule } from '@nestjs/testing';
import { ImpactController } from './impact.controller';
import { ImpactService } from './impact.service';

describe('ImpactController', () => {
  let controller: ImpactController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImpactController],
      providers: [ImpactService],
    }).compile();

    controller = module.get<ImpactController>(ImpactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
