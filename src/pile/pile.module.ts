import { Module } from '@nestjs/common';
import { PileService } from './pile.service';
import { PileController } from './pile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pile } from './entities/pile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pile])],
  controllers: [PileController],
  providers: [PileService],
  exports: [PileService]
})
export class PileModule { }
