import {
    IsBoolean,
    IsDateString,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Min
} from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @Min(0.01)
    @IsNumber({maxDecimalPlaces: 2})
    price: number;

    @IsInt()
    @IsPositive()
    quantity: number;

    @IsDateString()
    expiry_date: string;

    @IsBoolean()
    status: boolean;
}
