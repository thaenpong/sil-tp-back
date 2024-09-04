import { PileHeight } from "src/pile-height/entities/pile-height.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderHeight {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    employee_id: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @OneToMany(type => PileHeight, pileHeight => pileHeight.order_height)
    pile_height: PileHeight[]

}
