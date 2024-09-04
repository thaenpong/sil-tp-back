import { Type } from 'class-transformer';
import { IsString, IsNumber, IsOptional, ValidateNested, IsObject, IsArray, ArrayNotEmpty, IsNotEmpty } from 'class-validator';

class Product {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;
}

class Customer {
    @IsNumber()
    id: number;

    @IsString()
    @IsOptional()
    name: string;
}

class Pile {
    @IsString()
    @IsOptional()
    reference_id: string;

    @IsNumber()
    height: number;
}

class Order {
    @IsString()
    name: string;

    @IsNumber()
    width: number;

    @IsNumber()
    length: number;

    @ValidateNested()
    @IsObject()
    @Type(() => Customer)
    customer: Customer;

    @IsString()
    employee_code: string;

    @IsOptional()
    @IsNumber()
    amount: number;

    @IsOptional()
    @IsNumber()
    sil_order_id: number;

    @IsOptional()
    @IsString()
    sil_created: boolean;

    @IsOptional()
    @IsString()
    sil_created_at: string;

    @ValidateNested()
    @IsObject()
    @Type(() => Product)
    product: Product;
}

export class CreateOrderDto {
    @ValidateNested()
    @IsObject()
    @Type(() => Order)
    order: Order;

    @ValidateNested()
    @IsArray()
    @ArrayNotEmpty()
    @Type(() => Pile)
    piles: Pile[];
}