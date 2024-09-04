import { Test, TestingModule } from '@nestjs/testing';
import { PileService } from './pile.service';

describe('PileService', () => {
  let service: PileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PileService],
    }).compile();

    service = module.get<PileService>(PileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
