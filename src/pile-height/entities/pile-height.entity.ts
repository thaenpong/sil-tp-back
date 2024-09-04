import { OrderHeight } from "src/order-height/entities/order-height.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PileHeight {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column('decimal', { precision: 6, scale: 2 })
    total_height: number;

    @Column('decimal', { precision: 6, scale: 2 })
    palate_height: number;

    @Column('decimal', { precision: 6, scale: 2 })
    net_height: number;

    @CreateDateColumn({ type: 'timestamp', default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @Column()
    pic1_name: string;

    @Column()
    pic2_name: string;

    @ManyToOne(type => OrderHeight, orderHeight => orderHeight.id)
    order_height: OrderHeight
}
