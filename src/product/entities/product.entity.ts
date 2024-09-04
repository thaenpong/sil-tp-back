import { Order } from "src/order/entities/order.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: false })
    name: string;

    @OneToMany(() => Order, (order) => order.product)
    orders: Order[];
}
