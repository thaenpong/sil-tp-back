import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CheckProductDto {

    @IsNumber()
    @IsNotEmpty()
    id:number

    @IsNotEmpty()
    @IsString()
    name:string;
}
