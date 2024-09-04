import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
   @Get('employee/:id')
   getEmployee(@Param('id') id: string) {
     return this.appService.getEmployee(id);
   }
}
