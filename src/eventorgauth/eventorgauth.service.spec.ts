import { Test, TestingModule } from '@nestjs/testing';
import { EventorgauthService } from './eventorgauth.service';

describe('EventorgauthService', () => {
  let service: EventorgauthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventorgauthService],
    }).compile();

    service = module.get<EventorgauthService>(EventorgauthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
