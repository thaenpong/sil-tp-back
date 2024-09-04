import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, BadRequestException, InternalServerErrorException, ParseArrayPipe } from '@nestjs/common';
import { PileService } from './pile.service';
import { CreatePileDto } from './dto/create-pile.dto';
import { UpdatePileDto } from './dto/update-pile.dto';
import { SilUpdatePileDto } from './dto/sil-update-pile.dto';

@Controller('pile')
export class PileController {
  constructor(private readonly pileService: PileService) { }

  @Post()
  create(@Body() createPileDto: CreatePileDto) {
    return this.pileService.create(createPileDto);
  }

  @Get()
  findAll() {
    return this.pileService.findAll();
  }

  @Get('uncreated/:id')
  findUncreated(@Param('id') id: string) {
    return this.pileService.findUncreated(+id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pileService.findOne(+id);
  }


  @Patch('sil-create-one')
  updateOne(@Body() updatePilesDto: SilUpdatePileDto) {
    return this.pileService.SilUpdateOne(updatePilesDto);
  }

  @Patch('sil-create')
  update(@Body(new ParseArrayPipe({ items: SilUpdatePileDto })) updatePilesDto: SilUpdatePileDto[]) {
    return this.pileService.SilUpdate(updatePilesDto);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pileService.remove(+id);
  }
}
