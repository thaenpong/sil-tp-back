import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseArrayPipe, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, HttpException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { SilUpdateOrderDto } from './dto/sil-update-order.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post('upload/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new HttpException('Only JPEG and PNG images are allowed', HttpStatus.UNPROCESSABLE_ENTITY), false);
      }
      cb(null, true);
    }
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id') id: string) {
    console.log(file)
    try {
      const result = await this.orderService.processUploadedFile(+id, file);
      return { message: 'File uploaded successfully', result };
    } catch (error) {
      throw new HttpException(error.message || 'Failed to process file', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('uncreated')
  findAllUnCreatedSil() {
    return this.orderService.findAllUnCreatedSil();
  }



  @Get('uncreated/:id')
  findUnCreatedSil(@Param('id') id: string) {
    return this.orderService.findUnCreatedSil(Number(id));
  }

  @Patch('sil-create')
  SilCreateOrder( @Body() silCreateOrderDto: SilUpdateOrderDto) {
    return this.orderService.SilUpdateOrder( silCreateOrderDto)
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }


}
