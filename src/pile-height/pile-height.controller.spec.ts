import { Test, TestingModule } from '@nestjs/testing';
import { PileHeightController } from './pile-height.controller';
import { PileHeightService } from './pile-height.service';

describe('PileHeightController', () => {
  let controller: PileHeightController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PileHeightController],
      providers: [PileHeightService],
    }).compile();

    controller = module.get<PileHeightController>(PileHeightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
