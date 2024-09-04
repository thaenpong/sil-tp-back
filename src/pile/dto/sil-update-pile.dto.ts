import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SilUpdatePileDto {
    @IsNumber()
    @IsNotEmpty()
    LogisticPileId: number; // (เลขจากระบบจัดส่งที่ใช้สร้าง)

    @IsNumber()
    @IsNotEmpty()
    PileId: number; // (เลขจากระบบ SIL ที่สร้างมา)

    @IsOptional()
    @IsDateString()
    createdAt: Date;
}
