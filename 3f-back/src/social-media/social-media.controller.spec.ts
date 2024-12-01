import { Test, TestingModule } from '@nestjs/testing';
import { SocialMediaController } from './social-media.controller';
import { SocialMediaService } from './social-media.service';

describe('SocialMediaController', () => {
  let controller: SocialMediaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialMediaController],
      providers: [SocialMediaService],
    }).compile();

    controller = module.get<SocialMediaController>(SocialMediaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
