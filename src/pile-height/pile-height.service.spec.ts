import { Test, TestingModule } from '@nestjs/testing';
import { PileHeightService } from './pile-height.service';

describe('PileHeightService', () => {
  let service: PileHeightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PileHeightService],
    }).compile();

    service = module.get<PileHeightService>(PileHeightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
