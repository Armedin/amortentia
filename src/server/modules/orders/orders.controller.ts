import { Controller, Get, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('')
  async getOrders() {
    const orders = await this.ordersService.findAllOrders();
    return orders;
  }

  @Get(':id')
  async getOrderById(@Param('id') orderId: string) {
    const order = await this.ordersService.findOrderById(orderId);
    return order;
  }
}
