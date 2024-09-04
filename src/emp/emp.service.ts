import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmpDto } from './dto/create-emp.dto';
import { UpdateEmpDto } from './dto/update-emp.dto';
import { config } from 'dotenv';
config();

const data = {
  username: process.env.SIL_USER,
  password: process.env.SIL_PASS
};

@Injectable()
export class EmpService {
  async loginSil() {
    const res = await fetch('https://sil.hubnova.app:4600/users/login', {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      }
    })
    if (res.ok) {
      const resData = await res.json();
      return resData.token
    }
    else {
      return null;
    }
  }

  async getEmpName(Emp_Code: string) {
    const token = await this.loginSil();
    const res = await fetch('https://sil.hubnova.app:4000/utilities/all-employee', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })

    if (res.ok) {
      const resData = await res.json();
      const foundObject = await resData.find(obj => obj.EmployeeCode === Emp_Code);
      if (foundObject) {
        const empName = `${foundObject.FirstName} ${foundObject.LastName}`;
        return (empName)
      }
      return null;
    }
    else {
      return null;
    }
  }

  create(createEmpDto: CreateEmpDto) {
    return 'This action adds a new emp';
  }

  findAll() {
    return `This action returns all emp`;
  }

  async findOne(id: string) {
    const empName = await this.getEmpName(id);
    if (empName) {
      return empName;
    } else {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }
  }

  update(id: number, updateEmpDto: UpdateEmpDto) {
  }

  remove(id: number) {
    return `This action removes a #${id} emp`;
  }
}
