import { IsNumber, IsString } from "class-validator";

export class CreateCustomerDto {
    @IsNumber()
    id: number;

    @IsString()
    name: string;
}
