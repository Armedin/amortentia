import { Logger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ProductCategory } from './product-category.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class ProductCategoriesService {
  private logger = new Logger(ProductCategoriesService.name);

  constructor(
    @InjectRepository(ProductCategory)
    private readonly productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async getAllCategoriesWithProductCount(): Promise<any[]> {
    const query: any = await this.productRepository
      .createQueryBuilder('product')
      .select('category_id, count(1) as total')
      .innerJoinAndSelect('product.category', 'category')
      .groupBy('product.category_id')
      .getRawMany();

    return query.map(result => ({
      id: result.category_id,
      title: result.category_title,
      total: result.total,
    }));
  }

  async findCategoryById(id: string): Promise<ProductCategory> {
    const category = await this.productCategoryRepository.findOne(id);
    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async getAllCategories(): Promise<ProductCategory[]> {
    const categories = await this.productCategoryRepository.find();
    return categories;
  }

  async saveCategory(categoryDto: CreateCategoryDto): Promise<ProductCategory> {
    const category = await this.productCategoryRepository.save(categoryDto);
    return category;
  }
}
