import { Logger, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from '../products/products.service';
import { LineItem } from './line-item.entity';

@Injectable()
export class LineItemsService {
  private logger = new Logger(LineItemsService.name);

  constructor(
    @InjectRepository(LineItem)
    private readonly lineItemRepository: Repository<LineItem>,
    private readonly productService: ProductsService
  ) {}

  async findLineItemById(id: string) {
    const lineItem = await this.lineItemRepository.findOne(id);
    if (!lineItem) {
      throw new NotFoundException();
    }

    return lineItem;
  }

  async generateLineItem(productId: string, cartId: string) {
    const product = await this.productService.findProductById(productId);
    const rawLineItem: Partial<LineItem> = {
      title: product.title,
      description: product.description,
      thumbnail: product.thumbnail,
      price: product.price,
      product_id: product.id,
      cart_id: cartId,
      quantity: 1,
    };

    const lineItem = this.lineItemRepository.create(rawLineItem);
    return lineItem;
  }

  async createLineItem(data: Partial<LineItem>) {
    const lineItem = this.lineItemRepository.create(data);
    return await this.lineItemRepository.save(lineItem);
  }

  async update(id: string, data: Partial<LineItem>) {
    const lineItem = await this.findLineItemById(id);

    Object.keys(data).forEach(key => {
      lineItem[key] = data[key];
    });

    const updatedLineItem = await this.lineItemRepository.save(lineItem);
    return updatedLineItem;
  }

  async delete(id: string) {
    return await this.lineItemRepository
      .findOne(id)
      .then(lineItem => lineItem && this.lineItemRepository.remove(lineItem));
  }
}
