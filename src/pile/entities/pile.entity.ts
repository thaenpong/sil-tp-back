import { Order } from "src/order/entities/order.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Pile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    reference_id: string;

    @Column({ type: 'float', precision: 10, scale: 2, default: 0 })
    height: number;

    @ManyToOne(() => Order, (order) => order.id)
    order: Order;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @Column({nullable:true})
    sil_pile_id:number;

    @Column({type: "datetime",nullable:true})
    sil_created_at:Date;

    @Column({type:"boolean",default:false})
    sil_created:boolean;

    @Column()
    employee_code:string;

    @Column({default:0})
    amount:number;
}
