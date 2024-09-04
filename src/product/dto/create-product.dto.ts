import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProductDto {
    @IsOptional()
    @IsNumber()
    id:number;

    @IsNotEmpty()
    @IsString()
    name:string;
}
