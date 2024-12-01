import { Test, TestingModule } from '@nestjs/testing';
import { ImpactService } from './impact.service';

describe('ImpactService', () => {
  let service: ImpactService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImpactService],
    }).compile();

    service = module.get<ImpactService>(ImpactService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
