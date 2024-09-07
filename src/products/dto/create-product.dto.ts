import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\S.*\S$/, {
    message: 'name should not contain only white spaces',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^\S.*\S$/, {
    message: 'description should not contain only white spaces',
  })
  description: string;

  @Min(0.01)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  price: number;

  @IsInt()
  @Min(0)
  @IsNotEmpty()
  quantity: number;

  @IsDateString()
  @IsNotEmpty()
  expiry_date: string;
}
