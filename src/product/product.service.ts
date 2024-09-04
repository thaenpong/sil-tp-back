import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CheckProductDto } from './dto/check-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product)
  private productRepo: Repository<Product>
  ) { }


  async checkProduct(checkProductDto: CheckProductDto) {
    const product = await this.findOne(checkProductDto.id);
    if (!product) {
      await this.create(checkProductDto)
    } else if (product.name !== checkProductDto.name) {
      await this.update(checkProductDto.id, { name: checkProductDto.name });
    }
  }

  async create(createProductDto: CreateProductDto) {
    return this.productRepo.save(createProductDto);
  }

  async findAll() {
    return `This action returns all product`;
  }

  async findOne(id: number) {
    return await this.productRepo.findOne({ where: { id: id } });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return await this.productRepo.update(id, updateProductDto);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
