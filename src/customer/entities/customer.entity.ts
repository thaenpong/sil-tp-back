import { Order } from 'src/order/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Customer {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}
