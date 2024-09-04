import { IsNumber, IsOptional, IsString } from "class-validator";

class Order {
    @IsNumber()
    id: number;
}
export class CreatePileDto {
    @IsOptional()
    @IsString()
    reference_id: string;

    @IsNumber()
    height: number;

    order: Order

    @IsString()
    employee_code:string;

    @IsOptional()
    @IsNumber()
    amount:number;
}
