import { Injectable } from '@nestjs/common';
import { Cart } from '../../modules/carts/cart.entity';

export class TotalsService {
  async getSubTotal(cart: Cart): Promise<number> {
    let total = 0;
    if (!cart.items) {
      return total;
    }

    cart.items.map(item => {
      total += item.price * item.quantity;
    });

    return Math.round(total);
  }

  async getShippingTotal(cart: Cart): Promise<number> {
    const shippingCountry = cart.shipping_address?.country;

    if (!shippingCountry) {
      return 0;
    }

    if (shippingCountry === 'Albania') {
      return 300; // €3
    }

    if (shippingCountry === 'United States') {
      return 1800; // €18
    }

    return 900; // @TODO should take in account weight later on
  }
}
