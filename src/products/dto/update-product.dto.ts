import { PartialType } from '@nestjs/mapped-types';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsString()
  @IsIn(['active', 'inactive'])
  @IsNotEmpty()
  status: string;
}
