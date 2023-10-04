import { Test, TestingModule } from '@nestjs/testing';
import { CentralAuthService } from '../central-auth.service';

describe('CentralAuthService', () => {
  let service: CentralAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CentralAuthService],
    }).compile();

    service = module.get<CentralAuthService>(CentralAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
