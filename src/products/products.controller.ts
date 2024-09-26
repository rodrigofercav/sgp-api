/**
 * Controller for managing products.
 */
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Create
  @ApiOperation({ summary: 'Create a product' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Product created successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data validation failed.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Business rule validation failed.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Wildflower Honey' },
        description: {
          type: 'string',
          example: 'A 250g jar of pure, raw honey, harvested from wildflowers.',
        },
        price: { type: 'number', example: 31.99 },
        quantity: { type: 'integer', example: 10 },
        expiry_date: { type: 'string', example: '2035-12-31' },
      },
      required: [
        'name',
        'description',
        'price',
        'quantity',
        'expiry_date',
        'status',
      ],
    },
  })
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    try {
      return this.productsService.create(createProductDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  // Get all products
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of products returned successfully',
  })
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // Get one product by ID
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product returned successfully',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Business rule validation failed (Product ID not found).',
  })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  // Update
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Product successfully updated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product ID not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Data validation failed.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Business rule validation failed.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Wildflower Honey' },
        description: {
          type: 'string',
          example: 'A 250g jar of pure, raw honey, harvested from wildflowers.',
        },
        price: { type: 'number', example: 31.99 },
        quantity: { type: 'integer', example: 10 },
        expiry_date: { type: 'string', example: '2035-12-31' },
        status: { type: 'string', example: 'inactive' },
      },
      required: [
        'name',
        'description',
        'price',
        'quantity',
        'expiry_date',
        'status',
      ],
    },
  })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      return this.productsService.update(id, updateProductDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  // Delete
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Product successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Product ID not found',
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
