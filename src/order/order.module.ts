import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PileService } from 'src/pile/pile.service';
import { PileModule } from 'src/pile/pile.module';
import { Pile } from 'src/pile/entities/pile.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Pile]), PileModule, CustomerModule,ProductModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
