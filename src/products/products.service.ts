import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.checksIfProductIdExists(id);
    return product;
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    await this.checkIfProductNameExists(createProductDto.name);
    this.validateExpiryDate(createProductDto.expiry_date);

    const product = this.productRepository.create({
      ...createProductDto,
      status: 'active', // Default status is 'active'
    });
    return this.productRepository.save(product);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    await this.checksIfProductIdExists(id);
    await this.checkIfProductNameExists(updateProductDto.name, id);
    this.validateExpiryDate(updateProductDto.expiry_date);

    await this.productRepository.update(id, updateProductDto);
    return this.productRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.checksIfProductIdExists(id);
    await this.productRepository.delete(id);
  }

  /**
   * Checks if a product name already exists in the database.
   *
   * @param name - Product name to check.
   * @param id - Product ID (Optional)
   *             - On create: Do not pass.
   *             - On update: Must pass this parameter.
   * @throws ConflictException if a product with the same name already exists.
   */
  private async checkIfProductNameExists(
    name: string,
    id?: number,
  ): Promise<void> {
    const existingProductByName = await this.productRepository.findOne({
      where: { name },
    });

    if (existingProductByName) {
      if (id && existingProductByName.id !== id) {
        //update
        throw new ConflictException(
          `Product with name '${existingProductByName.name}' already exists with a different ID`,
        );
      } else if (!id) {
        //create
        throw new ConflictException(
          `Product with name '${existingProductByName.name}' already exists`,
        );
      }
    }
  }

  /**
   * Checks if a product exists by ID.
   *
   * @param id - The id of the product to check.
   * @returns A promise that resolves to the existing product if found.
   * @throws NotFoundException if the product id was not found.
   */
  private async checksIfProductIdExists(id: number): Promise<Product> {
    const existingProductById = await this.productRepository.findOne({
      where: { id },
    });

    if (!existingProductById) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return existingProductById;
  }

  /**
   * Validates the expiry date of a product.
   *
   * @param expiryDate - Product expiry date to be validated.
   * @throws ConflictException - If the expiry date is before the current date.
   */
  private validateExpiryDate(expiryDate: Date): void {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (expiryDate < currentDate) {
      throw new ConflictException(
        "Expiry date must be at least one day after today; you shouldn't add a product that has already expired.",
      );
    }
  }
}
