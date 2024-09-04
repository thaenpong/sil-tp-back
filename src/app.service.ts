import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    async getEmployee(empCode: string) {
        const response = await fetch(`${process.env.SIL_API}/quick-request/employee/detail/${empCode}`);
        
        if (!response.ok) {
          // If the response is not ok, throw a BadRequestException
          throw new BadRequestException('Employee not found or there was an error in the request');
        }
        
        const data = await response.json();
        
        if (!data) {
          // If the data is null or undefined, throw a BadRequestException
          throw new BadRequestException('No data found for the given employee code');
        }
        
        return data;
      }
}
