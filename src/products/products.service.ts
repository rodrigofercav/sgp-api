import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const existingProductByName = await this.productRepository.findOne({ where: { name: createProductDto.name } });
    if (existingProductByName) {
      throw new ConflictException(`Product with name ${createProductDto.name} already exists`);
    }

    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const existingProductById = await this.findOne(id);
    if (!existingProductById) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const existingProductByName = await this.productRepository.findOne({ where: { name: updateProductDto.name } });
    if (existingProductByName && existingProductByName.id !== id) {
      throw new ConflictException(`Product with name ${updateProductDto.name} already exists`);
    }

    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}
