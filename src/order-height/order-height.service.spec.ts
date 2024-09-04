import { Test, TestingModule } from '@nestjs/testing';
import { OrderHeightService } from './order-height.service';

describe('OrderHeightService', () => {
  let service: OrderHeightService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderHeightService],
    }).compile();

    service = module.get<OrderHeightService>(OrderHeightService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
