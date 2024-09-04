import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrderHeightService } from './order-height.service';
import { CreateOrderHeightDto } from './dto/create-order-height.dto';
import { UpdateOrderHeightDto } from './dto/update-order-height.dto';
import { EmpService } from '../emp/emp.service';

@Controller('order-height')
export class OrderHeightController {
  constructor(private readonly orderHeightService: OrderHeightService) { }

  @Post()
  create(@Body() createOrderHeightDto: CreateOrderHeightDto) {
    return this.orderHeightService.create(createOrderHeightDto);
  }


  @Get()
  findAll() {
    return this.orderHeightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderHeightService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderHeightDto: UpdateOrderHeightDto) {
    return this.orderHeightService.update(+id, updateOrderHeightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderHeightService.remove(+id);
  }
}
