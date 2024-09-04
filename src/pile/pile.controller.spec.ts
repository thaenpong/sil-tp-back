import { Test, TestingModule } from '@nestjs/testing';
import { PileController } from './pile.controller';
import { PileService } from './pile.service';

describe('PileController', () => {
  let controller: PileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PileController],
      providers: [PileService],
    }).compile();

    controller = module.get<PileController>(PileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
