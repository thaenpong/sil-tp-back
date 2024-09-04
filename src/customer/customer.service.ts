import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomerService {

  constructor(@InjectRepository(Customer)
  private customerRepository: Repository<Customer>) {
  }

  async create(createCustomerDto: CreateCustomerDto) {
    //console.log(createCustomerDto.id)
    const result = await this.customerRepository.findOne({where:{id:createCustomerDto.id}});
    
    if(!result){
      await this.customerRepository.save(createCustomerDto);
    }else if(result.name !== createCustomerDto.name){
      console.log('warning')
    }
  }

  findAll() {
    return this.customerRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
