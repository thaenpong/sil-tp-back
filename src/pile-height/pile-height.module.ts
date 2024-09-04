import { Module } from '@nestjs/common';
import { PileHeightService } from './pile-height.service';
import { PileHeightController } from './pile-height.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PileHeight } from './entities/pile-height.entity';
import { EmpService } from 'src/emp/emp.service';

@Module({
  imports: [TypeOrmModule.forFeature([PileHeight])],
  controllers: [PileHeightController],
  providers: [PileHeightService, EmpService],
})
export class PileHeightModule {

}
