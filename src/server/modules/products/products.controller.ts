import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  BadRequestException,
  UploadedFiles,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import LocalFilesInterceptor from '../../interceptors/local-files.interceptor';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductDto } from './dto/get-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('')
  async getProducts(@Query() query: GetProductDto) {
    const products = await this.productsService.findAllProducts(query);
    return products;
  }

  @Get('recommended')
  async getRecommendedProducts() {
    const products = await this.productsService.getRandomProducts(5);
    return products;
  }

  @Get(':id')
  async getProductById(@Param('id') productId: string) {
    const product = await this.productsService.findProductById(productId);
    return product;
  }

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    const product = await this.productsService.saveProduct(dto);
    return product;
  }

  @Put(':id')
  async updateProductById(
    @Param('id') productId: string,
    @Body() dto: UpdateProductDto
  ) {
    const product = await this.productsService.updateProductById(
      productId,
      dto
    );
    return product;
  }

  @Post('upload')
  @UseInterceptors(
    LocalFilesInterceptor({
      fieldName: 'files',
      path: '/',
      fileFilter: (req, file, callback) =>
        file.mimetype.includes('image')
          ? callback(null, true)
          : callback(
              new BadRequestException('Only image files are allowed'),
              false
            ),
    })
  )
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    return {
      uploads: files.map(file => ({
        url: file.filename,
      })),
    };
  }

  @Delete(':id')
  async deleteProductById(@Param('id') productId: string) {
    return await this.productsService.delete(productId);
  }
}
