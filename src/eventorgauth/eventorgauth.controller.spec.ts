import { Test, TestingModule } from '@nestjs/testing';
import { EventorgauthController } from './eventorgauth.controller';

describe('EventorgauthController', () => {
  let controller: EventorgauthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventorgauthController],
    }).compile();

    controller = module.get<EventorgauthController>(EventorgauthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
