import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RfidLog } from "./rfid-logs";

@Entity()
export class RfidMachine {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;


    @OneToMany(() => RfidLog, rfidLog => rfidLog.rfid_machine)
    pile_height: RfidLog[];
}

