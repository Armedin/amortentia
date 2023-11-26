import {
  InjectStripeClient,
  StripeWebhookHandler,
} from '@golevelup/nestjs-stripe';
import { Stripe } from 'stripe';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../carts/cart.entity';
import { PaymentSession } from './payment-session.entity';
import { TotalsService } from '../../utilities/totals/totals.service';
import { PaymentSessionStatusEnum } from './enums/PaymentSessionStatus.enum';

@Injectable()
export class PaymentsService {
  private readonly totalsService: TotalsService;
  constructor(
    @InjectStripeClient() private stripe: Stripe,
    @InjectRepository(PaymentSession)
    private readonly paymentSessionRepository: Repository<PaymentSession>
  ) {
    this.totalsService = new TotalsService();
  }

  async createStripePaymentIntent(cart: Cart): Promise<any> {
    const { customer_id, email } = cart;
    const subTotal = await this.totalsService.getSubTotal(cart);
    const shippingTotal = await this.totalsService.getShippingTotal(cart);

    const amount = subTotal + shippingTotal;

    const intentRequest: any = {
      amount,
      currency: 'eur',
      setup_future_usage: 'on_session',
      metadata: {
        cart_id: cart.id,
      },
    };

    if (customer_id) {
      intentRequest.customer = customer_id;
    } else {
      const stripeCustomer = await this.createStripeCustomer(email);
      intentRequest.customer = stripeCustomer.id;
    }

    return await this.stripe.paymentIntents.create(intentRequest);
  }

  async updateStripePaymentIntent(sessionData: any, cart: Cart): Promise<any> {
    try {
      if (sessionData.customer !== cart.customer_id) {
        return this.createStripePaymentIntent(cart);
      } else {
        if (cart.total && sessionData.amount === Math.round(cart.total)) {
          return sessionData;
        }

        return this.stripe.paymentIntents.update(sessionData.id, {
          amount: Math.round(cart.total),
        });
      }
    } catch (error) {}
  }

  async getStatus(paymentData: any) {
    const { id } = paymentData;
    const paymentIntent = await this.stripe.paymentIntents.retrieve(id);

    switch (paymentIntent.status) {
      case 'requires_payment_method':
      case 'requires_confirmation':
      case 'processing':
        return PaymentSessionStatusEnum.PENDING;
      case 'requires_action':
        return PaymentSessionStatusEnum.REQUIRES_MORE;
      case 'canceled':
        return PaymentSessionStatusEnum.CANCELED;
      case 'requires_capture':
      case 'succeeded':
        return PaymentSessionStatusEnum.AUTHORIZED;
      default:
        return PaymentSessionStatusEnum.PENDING;
    }
  }

  async createPaymentSession(cart: Cart) {
    const paymentData = await this.createStripePaymentIntent(cart);
    const createdPaymentSession = this.paymentSessionRepository.create({
      cart_id: cart.id,
      data: paymentData,
      provider: 'stripe',
    });

    return await this.paymentSessionRepository.save(createdPaymentSession);
  }

  async authorizePayment(paymentSession: PaymentSession) {
    const session = await this.findPaymentSessionById(paymentSession.id);
    if (!session) {
      return;
    }

    const status = await this.getStatus(paymentSession.data);
    session.status = status;

    return await this.paymentSessionRepository.save(session);
  }

  async updatePaymentSession(paymentSession: PaymentSession, cart: Cart) {
    paymentSession.data = await this.updateStripePaymentIntent(
      paymentSession.data,
      cart
    );
    return await this.paymentSessionRepository.save(paymentSession);
  }

  async createStripeCustomer(email: string) {
    try {
      const stripeCustomer = await this.stripe.customers.create({ email });
      return stripeCustomer;
    } catch (error) {
      throw error;
    }
  }

  async findPaymentSessionById(id: string) {
    const session = await this.paymentSessionRepository.findOne({ id });
    if (!session) {
      throw new NotFoundException();
    }

    return session;
  }
}
