import { Module } from '@nestjs/common';
import { RfidService } from './rfid.service';
import { RfidController } from './rfid.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rfid } from './entities/rfid.entity';
import { RfidLog } from './entities/rfid-logs';
import { RfidMachine } from './entities/rfid-machine';

@Module({
  imports: [TypeOrmModule.forFeature([Rfid, RfidLog, RfidMachine])],
  controllers: [RfidController],
  providers: [RfidService],
})
export class RfidModule { }
