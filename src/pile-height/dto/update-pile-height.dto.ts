import { PartialType } from '@nestjs/mapped-types';
import { CreatePileHeightDto } from './create-pile-height.dto';

export class UpdatePileHeightDto extends PartialType(CreatePileHeightDto) {}
