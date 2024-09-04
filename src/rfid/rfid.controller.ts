import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RfidService } from './rfid.service';
import { CreateRfidDto } from './dto/create-rfid.dto';
import { UpdateRfidDto } from './dto/update-rfid.dto';
import { CreateRfidLogDto } from './dto/create-rfid-log.dto';
import { CreateCardDto } from './dto/create-card.dto';

@Controller('rfid')
export class RfidController {
  constructor(private readonly rfidService: RfidService) { }

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.rfidService.createCard(createCardDto);
  }


  @Post('/log')
  createLogs(@Body() createRfidLogDto: CreateRfidLogDto) {
    return this.rfidService.createLog(createRfidLogDto);
  }

  @Get('/logs')
  findAlllog() {
    return this.rfidService.findAllLogs();
  }

  @Get('/machines')
  findAllMachine() {
    return this.rfidService.findAllMachines();
  }

  @Get('')
  findAllCard() {
    return this.rfidService.findAllCards();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rfidService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRfidDto: UpdateRfidDto) {
    return this.rfidService.update(+id, updateRfidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rfidService.remove(+id);
  }
}
