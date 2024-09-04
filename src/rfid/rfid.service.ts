import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRfidDto } from './dto/create-rfid.dto';
import { UpdateRfidDto } from './dto/update-rfid.dto';
import { CreateRfidLogDto } from './dto/create-rfid-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rfid } from './entities/rfid.entity';
import { Repository } from 'typeorm';
import { RfidLog } from './entities/rfid-logs';
import { RfidMachine } from './entities/rfid-machine';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class RfidService {

  constructor(@InjectRepository(Rfid)
  private rfidRepo: Repository<Rfid>,
    @InjectRepository(RfidLog)
    private rfidLogRepo: Repository<RfidLog>,
    @InjectRepository(RfidMachine)
    private rfidMacRepo: Repository<RfidMachine>
  ) {
  }

  async createCard(createCardDto: CreateCardDto) {
    try {
      await this.rfidRepo.save(createCardDto);
      return 'Rfid created successfully';
    } catch (error) {
      throw new NotFoundException(`Cannot Insert Data ${error}`);
    }
  }

  async findAllCards() {
    return await this.rfidRepo.find({ where: { is_active: true } });
  }

  async createLog(createRfidLogDto: CreateRfidLogDto) {
    const rfidString = createRfidLogDto.rfidString;
    const machineId = createRfidLogDto.machineId;

    const rfid = await this.rfidRepo.findOne({ where: { label: rfidString, is_active: true } });
    const machine = await this.rfidMacRepo.findOne({ where: { id: machineId } });
    if (!rfid || !machine) {
      throw new NotFoundException(`RFID with label '${rfidString}' not found`);
    }

    try {
      const insertData = { rfid: rfid, rfid_machine: machine }
      await this.rfidLogRepo.save(insertData);
      return 'Rfid log created successfully';
    } catch (error) {
      throw new NotFoundException(`Cannot Insert Data ${error}`);
    }

  }

  findAll() {
    return `This action returns all rfid`;
  }

  async findAllLogs() {
    return await this.rfidLogRepo.find({ relations: ['rfid_machine', 'rfid'] });
  }

  async findAllMachines() {
    // Fetch all machines from the repository
    const machines = await this.rfidMacRepo.find();

    // Iterate over the machines to get the count of logs for each machine
    const machineLogsCount = await Promise.all(machines.map(async (machine) => {
      // Count the logs where machinesId matches the current machine's id
      const count = await this.rfidLogRepo.count({ where: { rfid_machine: { id: machine.id } } });
      // Return an object with machine details and log count
      return {
        machine,
        logCount: count,
      };
    }));

    // Return the array of machines with their respective log counts
    return machineLogsCount;
  }


  findOne(id: number) {
    return `This action returns a #${id} rfid`;
  }

  update(id: number, updateRfidDto: UpdateRfidDto) {
    return `This action updates a #${id} rfid`;
  }

  async remove(id: number) {
    return await this.rfidRepo.update(id, { is_active: true });
  }
}
