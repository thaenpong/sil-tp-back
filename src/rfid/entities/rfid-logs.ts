import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RfidMachine } from "./rfid-machine";
import { Rfid } from "./rfid.entity";

@Entity()
export class RfidLog {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @ManyToOne(() => RfidMachine, rfidMachine => rfidMachine.id)
    rfid_machine: RfidMachine;

    @ManyToOne(() => Rfid, rfid => rfid.id)
    rfid: Rfid;
}

