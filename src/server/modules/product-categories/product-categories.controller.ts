import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ProductCategoriesService } from './product-categories.service';

@Controller('api/product-categories')
export class ProductCategoriesController {
  constructor(private readonly categoriesService: ProductCategoriesService) {}

  @Get()
  async getCategories() {
    const categories = await this.categoriesService.getAllCategories();
    return categories;
  }

  @Get('id/:id')
  async getCategoryById(@Param('id') categoryId: string) {
    const category = await this.categoriesService.findCategoryById(categoryId);
    return category;
  }

  @Get('/with-products-count')
  async getCategoriesWithCount() {
    const categories =
      await this.categoriesService.getAllCategoriesWithProductCount();
    return categories;
  }

  @Post()
  async createCategory(@Body() dto: CreateCategoryDto) {
    const category = await this.categoriesService.saveCategory(dto);
    return category;
  }
}
