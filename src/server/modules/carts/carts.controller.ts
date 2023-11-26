import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AddLineItemDto } from '../line-items/dto/add-line-item.dto';
import { LineItemsService } from '../line-items/line-items.service';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CreatePaypalOrderDto } from '../payments/dto/create-paypal-order.dto';
import { CapturePaypalOrderDto } from '../payments/dto/capture-paypal-order.dto';
import { UpdateLineItemDto } from '../line-items/dto/update-line-item.dto';

@Controller('api/carts')
export class CartsController {
  constructor(
    private readonly cartsService: CartsService,
    private readonly lineItemsService: LineItemsService
  ) {}

  @Post(':id/create-paypal-order')
  async createPaypalOrder(
    @Param('id') cartId: string,
    @Body() dto: CreatePaypalOrderDto
  ) {
    return await this.cartsService.createPaypalOrder(cartId, dto);
  }

  @Post(':id/capture-paypal-order')
  async capturePaypalOrder(
    @Param('id') cartId: string,
    @Body() dto: CapturePaypalOrderDto
  ) {
    return await this.cartsService.capturePaypalOrder(cartId, dto);
  }

  @Post()
  async createCart(@Body() dto: CreateCartDto) {
    return await this.cartsService.create(dto);
  }

  @Get(':id')
  async getCartById(@Param('id') cartId: string) {
    const cart = await this.cartsService.findCartById(cartId);
    return cart;
  }

  @Post(':id')
  async updateCartById(
    @Param('id') cartId: string,
    @Body() dto: UpdateCartDto
  ) {
    const cart = await this.cartsService.updateCartById(cartId, dto);
    return cart;
  }

  @Post(':id/line-items')
  async addLineItemToCart(
    @Param('id') cartId: string,
    @Body() dto: AddLineItemDto
  ) {
    const cart = await this.cartsService.findCartById(cartId);
    const lineItem = await this.lineItemsService.generateLineItem(
      dto.productId,
      cart.id
    );

    return await this.cartsService.addLineItem(cartId, lineItem);
  }

  @Put(':id/line-items/:itemId')
  async updateLineItem(
    @Param('id') cartId: string,
    @Param('itemId') itemId: string,
    @Body() dto: UpdateLineItemDto
  ) {
    return await this.cartsService.updateLineItem(cartId, itemId, dto);
  }

  @Delete(':id/line-items/:itemId')
  async removeLineItemFromCart(
    @Param('id') cartId: string,
    @Param('itemId') itemId: string
  ) {
    return await this.cartsService.removeLineItem(cartId, itemId);
  }

  @Post(':id/payment-session')
  async createPaymentSession(@Param('id') cartId: string) {
    return await this.cartsService.setPaymentSession(cartId);
  }

  @Post(':id/complete')
  async completeCart(@Param('id') cartId: string) {
    return await this.cartsService.completeCart(cartId);
  }
}
