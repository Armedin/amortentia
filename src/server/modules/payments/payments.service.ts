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
import { CreatePaypalOrderDto } from './dto/create-paypal-order.dto';
import axios from 'axios';

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

  private getApiUrl(environment: string) {
    return environment === 'sandbox'
      ? 'https://api-m.sandbox.paypal.com'
      : 'https://api-m.paypal.com';
  }

  private getBasicKey = () => {
    return Buffer.from(
      process.env.PAYPAL_CLIENT_ID + ':' + process.env.PAYPAL_SECRET_KEY
    ).toString('base64');
  };

  private generateAccessToken() {
    const url = `${this.getApiUrl(
      process.env.PAYPAL_ENV || 'sandbox'
    )}/v1/oauth2/token`;
    const basicKey = this.getBasicKey();
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    return axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${basicKey}`,
        },
      })
      .then(r => r.data)
      .catch(e => console.log(e));
  }

  private async preparePaypalRequestHeaders(customHeaders?: any) {
    const initiateTokenResponse: any = await this.generateAccessToken();
    const { access_token } = initiateTokenResponse;

    return {
      'Content-Type': 'application/json',
      Authorization: access_token
        ? `Bearer ${access_token}`
        : `Basic ${this.getBasicKey()}`,
      ...customHeaders,
    };
  }

  async createPaypalOrder(dto: CreatePaypalOrderDto, cart: Cart) {
    const subTotal = await this.totalsService.getSubTotal(cart);
    const shippingTotal = await this.totalsService.getShippingTotal(cart);

    const amount = subTotal + shippingTotal;

    const orderPayload = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: amount / 100,
          },
        },
      ],
    };

    const headers = await this.preparePaypalRequestHeaders();

    return await axios
      .post(
        `${this.getApiUrl(
          process.env.PAYPAL_ENV || 'sandbox'
        )}/v2/checkout/orders`,
        orderPayload,
        {
          headers: headers,
        }
      )
      .then(res => {
        return res.data;
      })
      .catch(e => {
        console.log(e);
      });
  }

  async capturePaymentForOrder(orderId: string) {
    const headers = await this.preparePaypalRequestHeaders();
    return await axios
      .post(
        `${this.getApiUrl(
          process.env.PAYPAL_ENV || 'sandbox'
        )}/v2/checkout/orders/${orderId}/capture`,
        {},
        {
          headers: headers,
        }
      )
      .then(res => {
        return res.data;
      })
      .catch(e => {
        console.log(e);
      });
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
    const createdPaymentSession = this.paymentSessionRepository.create({
      cart_id: cart.id,
      data: {},
      provider: 'paypal',
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
