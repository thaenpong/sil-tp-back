import { Test, TestingModule } from '@nestjs/testing';
import { OrderHeightController } from './order-height.controller';
import { OrderHeightService } from './order-height.service';

describe('OrderHeightController', () => {
  let controller: OrderHeightController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderHeightController],
      providers: [OrderHeightService],
    }).compile();

    controller = module.get<OrderHeightController>(OrderHeightController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
