import { IsNotEmpty, IsString } from "class-validator";

export class CreateCardDto {
    @IsString()
    @IsNotEmpty()
    label: string;

    @IsString()
    employee_id: string;

    @IsString()
    @IsNotEmpty()
    plate: string;
}
