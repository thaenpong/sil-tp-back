import { Injectable } from '@nestjs/common';
import { CreateOrderHeightDto } from './dto/create-order-height.dto';
import { UpdateOrderHeightDto } from './dto/update-order-height.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderHeight } from './entities/order-height.entity';
import { Repository } from 'typeorm';
import { EmpService } from '../emp/emp.service';

@Injectable()
export class OrderHeightService {

  constructor(@InjectRepository(OrderHeight)
  private orderHeightRepo: Repository<OrderHeight>,
    private readonly empService: EmpService
  ) {
  }

  async create(createOrderHeightDto: CreateOrderHeightDto) {
    const insert = await this.orderHeightRepo.save(createOrderHeightDto);
    const empName = await this.empService.getEmpName(createOrderHeightDto.employee_id);
    return JSON.stringify({ JobId: insert.id, EmpName: empName });
  }

  async findAll() {
    const res = await this.orderHeightRepo.find({ relations: ['pile_height'] });
    const ordersWithoutEmpName = res.map(order => {
      const { pile_height, ...orderWithoutPiles } = order;
      return {
        ...orderWithoutPiles,
        pilesCount: pile_height.length,
      };
    });

    // Fetch employee names in a separate loop (handle errors as needed)
    const employeeNames = await Promise.all(
      ordersWithoutEmpName.map(order => this.empService.getEmpName(order.employee_id))
    );

    // Combine orders and employee names
    const ordersWithPilesCount = ordersWithoutEmpName.map((order, index) => {
      return {
        ...order,
        empName: employeeNames[index] || 'Unknown Employee', // Default value
      };
    });

    return ordersWithPilesCount;
  }



  async findOne(id: number) {
    const res = await this.orderHeightRepo.findOne({ where: { id: id }, relations: ['pile_height'] })
    if (res) {
      const employeeNames = await this.empService.findOne(res.employee_id);
      const pileOrder = { ...res, empName: employeeNames }
      return pileOrder;
    }
    return null;
  }

  update(id: number, updateOrderHeightDto: UpdateOrderHeightDto) {
    return `This action updates a #${id} orderHeight`;
  }

  remove(id: number) {
    return `This action removes a #${id} orderHeight`;
  }
}
