import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RfidLog } from "./rfid-logs";

@Entity()
export class Rfid {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    label: string;

    @Column({ unique: true })
    plate: string;

    @Column()
    employee_id: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    created_at: Date;

    @OneToMany(() => RfidLog, rfidLog => rfidLog.rfid)
    rfid_log: Rfid[];

    @Column({ type: "boolean", default: true })
    is_active: boolean;


}

