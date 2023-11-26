import {
  Logger,
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationOptions, Repository } from 'typeorm';
import { TotalsService } from '../../utilities/totals/totals.service';
import { LineItem } from '../line-items/line-item.entity';
import { LineItemsService } from '../line-items/line-items.service';
import { OrdersService } from '../orders/orders.service';
import { PaymentsService } from '../payments/payments.service';
import { Cart } from './cart.entity';
import { CreateCartDto } from './dto/create-cart.dto';
import { CreatePaypalOrderDto } from '../payments/dto/create-paypal-order.dto';
import { CapturePaypalOrderDto } from '../payments/dto/capture-paypal-order.dto';
import { UpdateLineItemDto } from '../line-items/dto/update-line-item.dto';

@Injectable()
export class CartsService {
  private logger = new Logger(CartsService.name);
  private totalsService: any;

  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    private readonly lineItemsService: LineItemsService,
    private readonly paymentsService: PaymentsService,
    @Inject(forwardRef(() => OrdersService))
    private readonly ordersService: OrdersService
  ) {
    this.totalsService = new TotalsService();
  }

  async createPaypalOrder(cartId: string, dto: CreatePaypalOrderDto) {
    const cart = await this.findCartById(cartId);

    return await this.paymentsService.createPaypalOrder(dto, cart);
  }

  async capturePaypalOrder(cartId: string, dto: CapturePaypalOrderDto) {
    const cart = await this.findCartById(cartId);

    const res = await this.paymentsService.capturePaymentForOrder(dto.orderId);
    return res;
  }

  async create(dto: CreateCartDto) {
    const createdCart = await this.cartRepository.create(dto);
    return this.cartRepository.save(createdCart);
  }

  async findCartById(cartId: string, options?: any) {
    const cart = await this.cartRepository.findOne(
      cartId,
      options || {
        relations: ['items', 'payment_session'],
      }
    );
    if (!cart) {
      throw new NotFoundException();
    }

    const subTotal = await this.totalsService.getSubTotal(cart);
    const shippingTotal = await this.totalsService.getShippingTotal(cart);

    cart.total = subTotal + shippingTotal;
    return cart;
  }

  async addLineItem(cartId: string, lineItem: LineItem): Promise<any> {
    const cart = await this.findCartById(cartId);

    const currentItem = cart.items.find(
      item => item.product_id === lineItem.product_id
    );

    const quantity = currentItem
      ? (currentItem.quantity += lineItem.quantity)
      : lineItem.quantity;

    if (currentItem) {
      await this.lineItemsService.update(currentItem.id, { quantity });
    } else {
      await this.lineItemsService.createLineItem({
        ...lineItem,
        cart_id: cartId,
      });
    }

    // Update payment session if it exists
    if (cart.payment_session) {
      const resultCart = await this.setPaymentSession(cartId);
      return resultCart;
    }

    // Return updated cart
    return this.findCartById(cartId);
  }

  async updateLineItem(cartId: string, itemId: string, dto: UpdateLineItemDto) {
    const cart = await this.findCartById(cartId);

    const lineItem = cart.items.find(item => item.id === itemId);
    if (!lineItem) {
      return cart;
    }

    await this.lineItemsService.update(lineItem.id, dto);

    // Return updated cart
    return this.findCartById(cartId);
  }

  async removeLineItem(cartId: string, itemId: string) {
    const cart = await this.findCartById(cartId);

    const lineItem = cart.items.find(item => item.id === itemId);
    if (!lineItem) {
      return cart;
    }

    await this.lineItemsService.delete(lineItem.id);

    // Update payment session if it exists
    if (cart.payment_session) {
      const resultCart = await this.setPaymentSession(cartId);
      return resultCart;
    }

    // Return updated cart
    return this.findCartById(cartId);
  }

  async setPaymentSession(cartId: string) {
    const cart = await this.findCartById(cartId);

    // @TODO When updating the payment session, check if total is not zero, otherwise stripe fails!!!

    if (!cart.payment_session) {
      const paymentSession = await this.paymentsService.createPaymentSession(
        cart
      );
      cart.payment_session = paymentSession;
      cart.customer_id = paymentSession.data.customer as string;
      await this.cartRepository.save(cart);
    } else {
      await this.paymentsService.updatePaymentSession(
        cart.payment_session,
        cart
      );
    }

    return cart;
  }

  //By this point, the actual payment transaction has finished
  async completeCart(cartId: string) {
    const cart = await this.findCartById(cartId);

    // @TODO wrap in try catch and check for error message
    const order = await this.ordersService.createOrderFromCart(cartId);

    return order!!;
  }

  //By this point, the actual payment transaction has finished
  async oldCompleteCart(cartId: string) {
    const cart = await this.findCartById(cartId);

    await this.paymentsService.authorizePayment(cart.payment_session);

    // @TODO wrap in try catch and check for error message
    const order = await this.ordersService.createOrderFromCart(cartId);

    return order!!;
  }

  async updateCartById(cartId: string, updateCartDto: any): Promise<Cart> {
    const cart = await this.findCartById(cartId);
    const updatedCart = await this.cartRepository.save({
      ...cart,
      ...updateCartDto,
    });

    return updatedCart;
  }
}
