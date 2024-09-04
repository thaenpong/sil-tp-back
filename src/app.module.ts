import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { Customer } from './customer/entities/customer.entity';
import { Order } from './order/entities/order.entity';
import { PileModule } from './pile/pile.module';
import { Pile } from './pile/entities/pile.entity';
import { PileHeightModule } from './pile-height/pile-height.module';
import { PileHeight } from './pile-height/entities/pile-height.entity';
import { OrderHeightModule } from './order-height/order-height.module';
import { OrderHeight } from './order-height/entities/order-height.entity';
import { EmpService } from './emp/emp.service';
import { EmpModule } from './emp/emp.module';
import { RfidModule } from './rfid/rfid.module';
import { Rfid } from './rfid/entities/rfid.entity';
import { RfidLog } from './rfid/entities/rfid-logs';
import { RfidMachine } from './rfid/entities/rfid-machine';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Product ],
      synchronize: true,
      autoLoadEntities:true,
      //logging: true, // Enable logging
    }),
    OrderModule,
    CustomerModule,
    PileModule,
    PileHeightModule,
    OrderHeightModule,
    EmpModule,
    RfidModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmpService],
})
export class AppModule { }
