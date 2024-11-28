import { Test, TestingModule } from '@nestjs/testing';
import { SocialMediaService } from './social-media.service';

describe('SocialMediaService', () => {
  let service: SocialMediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialMediaService],
    }).compile();

    service = module.get<SocialMediaService>(SocialMediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
