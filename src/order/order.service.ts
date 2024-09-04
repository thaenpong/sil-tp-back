import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CreatePileDto } from 'src/pile/dto/create-pile.dto';
import { map } from 'rxjs';
import { PileService } from '../pile/pile.service';
import { Pile } from 'src/pile/entities/pile.entity';
import { SilUpdateOrderDto } from './dto/sil-update-order.dto';
import { CustomerService } from 'src/customer/customer.service';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import axios from 'axios'
import * as fs from 'fs'
import * as FormData from 'form-data'
import { ProductService } from 'src/product/product.service';
import Image from 'image-js';


const papergram = 0.6;

interface Department {
  Id: number;
  Name: string;
}

interface Employee {
  Id: number;
  FirstName: string;
  LastName: string;
  EmployeeCode: string;
  Department: Department;
}

@Injectable()
export class OrderService {
  private readonly urlLineNotification =
    'https://notify-api.line.me/api/notify';
  private readonly lineNotifyToken = process.env.LINE_NOTIFY_TOKEN;

  constructor(
    @InjectRepository(Order)
    private orderRes: Repository<Order>,

    @InjectRepository(Pile)
    private pileRes: Repository<Pile>,

    private readonly pileService: PileService,

    private readonly customerService: CustomerService,

    private readonly productService: ProductService,


  ) {

  }


  private async getEmp(empCode: string): Promise<string> {
    try {
      const response = await fetch(`${process.env.SIL_API}/quick-request/employee/detail/${empCode}`);
      if (response.ok) {
        const data: Employee = await response.json();
        return `${data.FirstName} ${data.LastName}`;
      }
      return '';
    } catch (error) {
      console.error('Error fetching employee data:', error);
      return '';
    }

  }

  private getFormatDate(created_at: Date) {
    // Clone the created_at date to avoid modifying the original
    let createdAt = new Date(created_at);

    // Add 7 hours to the date
    createdAt.setHours(createdAt.getHours() + 7);

    // Format the date
    let formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}/${(createdAt.getMonth() + 1).toString().padStart(2, '0')}/${createdAt.getFullYear()} ${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}`;

    return formattedDate;
  }


  async processUploadedFile(id: number, file: Express.Multer.File) {
    try {
      const order = await this.orderRes.findOne({ where: { id: id }, relations: ["customer", "piles"] });
      if (!order) {
        this.deleteFile(file.filename);
        throw new BadRequestException('Order not found');
      }

      const employeeName = await this.getEmp(order.employee_code);

      console.log(file);
      if (file.size > 3000000) {
        // Load and resize image using image-js
        let image = await Image.load(`./uploads/${file.filename}`);
        image = image.resize({ width: 1280 });

        // Save the resized image back to file system
        await image.save(`./uploads/${file.filename}`);
      }
      // Create a readable stream of the resized image
      const imageFile = fs.createReadStream(`./uploads/${file.filename}`);

      // Prepare form data including image and other fields
      const formData = new FormData();
      formData.append('message', `\n${employeeName}  \nรับงาน ลูกค้า : ${order.customer.name} \nเวลา : ${this.getFormatDate(order.created_at)} \nขนาด : ${order.width} * ${order.length} นิ้ว, \nจำนวน : ${order.amount} \nจำนวนขา : ${order.piles.length} \nรหัสงาน : ${order.sil_order_id ? order.sil_order_id : `ยังไม่ได้สร้างคำสั่งผลิต`}`);
      formData.append('imageFile', imageFile);

      // Make a POST request to Line API with Axios
      const response = await axios({
        method: 'POST',
        url: this.urlLineNotification,
        headers: {
          Authorization: `Bearer ${this.lineNotifyToken}`,
          ...formData.getHeaders() // Automatically sets 'Content-Type': 'multipart/form-data'
        },
        data: formData,
      });

      // Upload file to Firebase Storage
      const storage = getStorage();
      const fileRef = ref(storage, `images/orders/${file.originalname}`);
      await uploadBytes(fileRef, file.buffer);

      // Delete temporary uploaded file
      this.deleteFile(file.filename);

      return 'success';
    } catch (error) {
      // Handle errors
      console.log(error);
      this.deleteFile(file.filename);
      throw new InternalServerErrorException('Failed to process file');
    }
  }

  private deleteFile(filename: string) {
    fs.unlink(`./uploads/${filename}`, (err) => {
      if (err) {
        console.error(`Error deleting file ${filename}:`, err);
      } else {
        console.log(`Deleted file ${filename}`);
      }
    });
  }




  async create(createOrderDto: CreateOrderDto) {
    try {
      await this.customerService.create(createOrderDto.order.customer);
      await this.productService.checkProduct(createOrderDto.order.product)

      const order = createOrderDto.order;
      const piles = createOrderDto.piles;

      if (order.sil_order_id) {
        order.sil_created = true;
        order.sil_created_at = String(new Date());
      }

      if (!order.amount) {
        let amount = 0;
        piles.forEach((pile: Pile) => {
          amount += (pile.height * 10) / papergram;
        });

        order.amount = amount;
      }

      const res = await this.orderRes.save(order);

      /* console.log('hi');
      if (res) {
        console.log('created');
        const line = await fetch(this.urlLineNotification, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.lineNotifyToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
          },
          body: `message=${encodeURIComponent(`สร้างงาน ${res.id}`)}`
        });
        console.log(line.status);
      } */
      const id = res.id;

      for (const pile of piles) {
        const createPileDto: CreatePileDto = {
          ...pile,
          order: { id: id },
          employee_code: order.employee_code,
          amount: (pile.height * 10) / papergram,
        };

        await this.pileService.create(createPileDto);
      }

      return res.id;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    // Fetching the orders with related piles and customer
    const orders = await this.orderRes.find({ relations: ['piles', 'customer', "product"] });

    // Transforming the orders to include the piles count and remove piles data
    const ordersWithPilesCount = orders.map(order => {
      const { piles, ...orderWithoutPiles } = order;
      return {
        ...orderWithoutPiles,
        pilesCount: piles.length
      };
    });

    return ordersWithPilesCount;
  }


  async findOne(id: number) {
    const res = await this.orderRes.findOne({
      where: {
        id: id,
      }, relations: ['piles', 'customer', "product"], order: {
        piles: { id: 'ASC' }, // Sort piles by id in descending order
      },
    })
    return res;
  }

  async findAllUnCreatedSil() {
    try {
      // Fetch orders where sil_created is false
      const orders = await this.orderRes.find({ where: { sil_created: false }, relations: ["customer", "product"] });

      // Map over orders to get pile counts and wait for all promises to resolve
      const ordersWithPileCounts = await Promise.all(
        orders.map(async (order) => {
          // Count piles related to the current order
          const pileCount = await this.pileRes.count({ where: { order: { id: order.id } } });
          // Attach pileCount to the order object
          return { ...order, pileCount };
        })
      );

      // Return the array of orders with pile counts
      return ordersWithPileCounts;
    } catch (error) {
      // Handle error appropriately
      console.error('Error fetching uncreated SILs:', error);
      throw error; // Or handle the error as needed
    }
  }

  async findUnCreatedSil(id: number) {
    try {
      // Fetch the order where sil_created is false and id matches the provided id
      const order = await this.orderRes.findOne({ where: { sil_created: false, id: id }, relations: ["piles", "customer", "product"] });

      if (!order) {
        // If no order is found, return null or handle as needed
        return null;
      }

      // Return the order with pile count
      return order;
    } catch (error) {
      // Handle error appropriately
      console.error('Error fetching uncreated SIL:', error);
      throw error; // Or handle the error as needed
    }
  }

  async SilUpdateOrder(silCreateOrderDto: SilUpdateOrderDto) {
    const id = silCreateOrderDto.LogisticOrderId
    try {
      // Check if the order is already created
      const existingOrder = await this.orderRes.findOne({ where: { id: id } });

      if (!existingOrder) {
        // Return a response indicating that the order was not found
        throw new BadRequestException(`Order with id ${id} not found.`);
      }

      if (existingOrder.sil_created) {
        // Return a response indicating that the order is already created
        throw new BadRequestException(`Order with id ${id} is already created. Cannot update.`);
      }

      const data = {
        sil_order_id: silCreateOrderDto.ProductOrderId,
        sil_created: true,
        sil_created_at: String(new Date()),
      };

      const result = await this.orderRes.update({ id }, data);

      if (result.affected === 0) {
        // Return a response indicating that the update was not successful
        throw new BadRequestException(`No rows updated for id ${id}. Please check the provided ID.`);
      } else {
        // Return a response indicating that the update was successful
        return `Update successful for id ${id}.`;
      }
    } catch (error) {
      // Re-throw the original error
      throw error;
    }
  }






  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
