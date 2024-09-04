import { PartialType } from '@nestjs/mapped-types';
import { CreatePileDto } from './create-pile.dto';

export class UpdatePileDto extends PartialType(CreatePileDto) {}
