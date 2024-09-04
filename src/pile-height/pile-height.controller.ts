import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { PileHeightService } from './pile-height.service';
import { CreatePileHeightDto } from './dto/create-pile-height.dto';
import { UpdatePileHeightDto } from './dto/update-pile-height.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('pile-height')
export class PileHeightController {
  constructor(private readonly pileHeightService: PileHeightService) { }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.pileHeightService.processUploadedFile(file);
  }

  @Post()
  create(@Body() createPileHeightDto: CreatePileHeightDto) {
    return this.pileHeightService.create(createPileHeightDto);
  }



  @Get()
  findAll() {
    return this.pileHeightService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pileHeightService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePileHeightDto: UpdatePileHeightDto) {
    return this.pileHeightService.update(+id, updatePileHeightDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pileHeightService.remove(+id);
  }
}
