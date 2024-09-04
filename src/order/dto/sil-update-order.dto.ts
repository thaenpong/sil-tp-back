import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SilUpdateOrderDto {

    @IsNotEmpty()
    @IsNumber()
    LogisticOrderId:number

    @IsNumber()
    @IsNotEmpty()
    ProductOrderId: number //1, (เลขจากระบบ SIL ที่สร้างมา)

    @IsOptional()
    @IsDateString()
    createdAt: Date;//time stamp
}