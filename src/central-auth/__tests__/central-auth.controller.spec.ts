import { Test, TestingModule } from '@nestjs/testing';
import { CentralAuthController } from '../central-auth.controller';

describe('CentralAuthController', () => {
  let controller: CentralAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CentralAuthController],
    }).compile();

    controller = module.get<CentralAuthController>(CentralAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
