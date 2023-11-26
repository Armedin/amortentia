import {
  Logger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  private logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async saveProduct(productDto: CreateProductDto): Promise<Product> {
    const product = await this.productRepository.save(productDto);
    return product;
  }

  async findAllProducts(query: GetProductDto): Promise<Product[]> {
    const filters = {};

    if (query.categoryId) {
      filters['category_id'] = query.categoryId;
    }

    const products = await this.productRepository.find(filters);
    return products;
  }

  async findProductById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  async getRandomProducts(take: number): Promise<Product[]> {
    const products = await this.productRepository
      .createQueryBuilder('product')
      .orderBy('RAND()')
      .take(take)
      .getMany();

    return products;
  }

  async updateProductById(id: string, dto: CreateProductDto): Promise<Product> {
    try {
      // const updatedProduct = await this.productRepository
      //   .createQueryBuilder()
      //   .update(dto)
      //   .where({ id })
      //   .returning('*')
      //   .execute();

      const product = await this.findProductById(id);
      const updatedProduct = await this.productRepository.save({
        ...product,
        ...dto,
      });

      this.logger.log(
        `A product has been updated with ID: ${id} | Date: ${new Date().toLocaleString()}`
      );

      return updatedProduct;
    } catch (e) {
      this.logger.error('Error updating product information. Details:', e);
      throw new InternalServerErrorException(e);
    }
  }

  async delete(id: string) {
    // const product = await this.findProductById(id);

    // @TODO need to get all the line items connected with the product's id and delete them first

    return await this.productRepository
      .findOne(id)
      .then(product => product && this.productRepository.remove(product));
  }
}
