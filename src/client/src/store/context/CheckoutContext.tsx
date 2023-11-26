import { Cart } from '@store/interfaces/cart.interface';
import { CheckoutForm } from '@store/interfaces/checkout.interface';
import { cartService } from '@store/services/cart.service';
import { useRouter } from 'next/router';
import React from 'react';
import { useCart } from './CartContext';

interface CheckoutContext {
  cart?: Cart;
  setAddress?: (data: CheckoutForm) => any;
  initPayment?: () => void;
  onPaymentComplete?: () => void;
}

interface CheckoutProviderProps {
  children: React.ReactNode;
}

const CheckoutContext = React.createContext<CheckoutContext | null>(null);

export const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const { cart, setCart, updateCart, resetCart } = useCart();
  const router = useRouter();

  const setAddress = (data: CheckoutForm) => {
    const { shipping_address, email } = data;

    return updateCart({ shipping_address, email }).then(() => initPayment());
  };

  const createPaymentSession = async (cartId: string) => {
    return cartService
      .createPaymentSession(cartId)
      .then(res => res)
      .catch(() => null);
  };

  const initPayment = async () => {
    if (cart?.id && !cart.payment_session && cart?.items?.length) {
      const cartWithPaymentSession = await createPaymentSession(cart.id);

      // if (!paymentSession) {
      //   setTimeout(initPayment, 500)
      // } else {
      //   setCart(paymentSession)
      //   return
      // }

      setCart(cartWithPaymentSession);
    }
  };

  const onPaymentComplete = async () => {
    return cartService.completePayment(cart?.id).then(res => {
      resetCart();
      router.push(`/order/confirmed/${res.id}`);
    });
  };

  return (
    <CheckoutContext.Provider
      value={{ cart, setAddress, initPayment, onPaymentComplete }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckout = () => {
  const context = React.useContext(CheckoutContext);
  return context;
};
