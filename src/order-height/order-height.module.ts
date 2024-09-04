import { Module } from '@nestjs/common';
import { OrderHeightService } from './order-height.service';
import { OrderHeightController } from './order-height.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderHeight } from './entities/order-height.entity';
import { EmpService } from 'src/emp/emp.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderHeight])],
  controllers: [OrderHeightController],
  providers: [OrderHeightService, EmpService],
})
export class OrderHeightModule { }
