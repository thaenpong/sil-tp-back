import { Customer } from "src/customer/entities/customer.entity";
import { Pile } from "src/pile/entities/pile.entity";
import { Product } from "src/product/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Customer, (customer) => customer.id)
    customer: Customer;

    @Column({ type: 'float', precision: 10, scale: 2, default: 0 })
    width: number;

    @Column({ type: 'float', precision: 10, scale: 2, default: 0 })
    length: number;

    @OneToMany(() => Pile, (pile) => pile.order)
    piles: Pile[];

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @Column()
    amount: number;

    @Column({ nullable: true })
    sil_order_id: number;

    @Column({ type: "boolean", default: false })
    sil_created: boolean;

    @Column({ nullable: true, type: "datetime" })
    sil_created_at: Date;

    @Column()
    employee_code: string;

    @ManyToOne(() => Product, (product) => product.id)
    product: Product;

}
