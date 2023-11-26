import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartsService } from '../carts/carts.service';
import { LineItemsService } from '../line-items/line-items.service';
import { MailService } from '../mail/mail.service';
import { PaymentsService } from '../payments/payments.service';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(forwardRef(() => CartsService))
    private readonly cartsService: CartsService,
    private readonly paymentsService: PaymentsService,
    private readonly lineItemsService: LineItemsService,
    private readonly mailService: MailService
  ) {}

  async createOrderFromCart(cartId: string) {
    const cart = await this.cartsService.findCartById(cartId);
    const { payment_session, total } = cart;

    const data = {
      payment_status: 'pending',
      email: cart.email,
      customer_id: cart.customer_id,
      cart_id: cart.id,
      shipping_address: cart.shipping_address,
      total: cart.total,
    } as Partial<Order>;

    const createdOrder = this.orderRepository.create(data);
    const resultOrder = await this.orderRepository.save(createdOrder);

    for (const item of cart.items) {
      await this.lineItemsService.update(item.id, { order_id: resultOrder.id });
    }

    await this.cartsService.updateCartById(cartId, {
      completed_at: new Date(),
    });

    const finalOrder = await this.findOrderById(resultOrder.id);

    this.mailService.sendOrderConfirmationMail(finalOrder);

    return resultOrder;
  }

  async oldCreateOrderFromCart(cartId: string) {
    const cart = await this.cartsService.findCartById(cartId);
    const { payment_session, total } = cart;

    if (!cart.items.length) {
      // throw an error "can't create an order with no items!"
    }

    // Confirm inventory!
    // for(const item in cart.items) {

    // }

    const paymentStatus = await this.paymentsService.getStatus(
      payment_session.data
    );

    if (paymentStatus !== 'authorized') {
      // throw an error for "payment method not authorized"
    }

    const data = {
      payment_status: 'pending',
      email: cart.email,
      customer_id: cart.customer_id,
      cart_id: cart.id,
      shipping_address: cart.shipping_address,
      total: cart.total,
    } as Partial<Order>;

    const createdOrder = this.orderRepository.create(data);
    const resultOrder = await this.orderRepository.save(createdOrder);

    for (const item of cart.items) {
      await this.lineItemsService.update(item.id, { order_id: resultOrder.id });
    }

    await this.cartsService.updateCartById(cartId, {
      completed_at: new Date(),
    });

    const finalOrder = await this.findOrderById(resultOrder.id);

    this.mailService.sendOrderConfirmationMail(finalOrder);

    return resultOrder;
  }

  async findOrderById(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne(id, {
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException();
    }

    return order;
  }

  async findAllOrders() {
    const orders = await this.orderRepository.find({
      order: { created_at: -1 },
    });
    return orders;
  }
}
