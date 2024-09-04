import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderHeightDto } from './create-order-height.dto';

export class UpdateOrderHeightDto extends PartialType(CreateOrderHeightDto) {}
