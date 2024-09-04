import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRfidLogDto {
    @IsString()
    @IsNotEmpty()
    rfidString: string;

    @IsNumber()
    @IsNotEmpty()
    machineId: number;
}
