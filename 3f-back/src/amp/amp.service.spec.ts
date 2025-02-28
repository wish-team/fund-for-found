import { Test, TestingModule } from '@nestjs/testing';
import { AmpService } from './amp.service';

describe('AmpService', () => {
  let service: AmpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AmpService],
    }).compile();

    service = module.get<AmpService>(AmpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
