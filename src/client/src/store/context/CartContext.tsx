import React, { useEffect, useMemo, useState } from 'react';
import { Product } from '@admin/interfaces/product';
import { Cart } from '@store/interfaces/cart.interface';
import { cartService } from '@store/services/cart.service';

interface CartContext {
  cart?: Cart;
  isOpen?: boolean;
  updateOpenState: (state: boolean) => void;
  addItemToCart: (itemId: string) => void;
  updateCartItem: (itemId: string, data: any) => void;
  removeItemFromCart: (itemId: string) => void;
  setCart: (cart: Cart) => void;
  updateCart: (data: any) => any;
  resetCart: () => void;
  subtotal: number;
  shippingTotal: number;
  total: number;
  totalItems: number;
}

interface CardContextProps {
  children?: React.ReactNode;
}

const initialState = {
  id: '',
  items: [] as Product[],
} as Cart;

const CartContext = React.createContext<CartContext | null>(null);

const IS_SERVER = typeof window === 'undefined';
const CART_KEY = 'cart_id';

export const CartProvider = ({ children }: CardContextProps) => {
  const [cart, setCart] = useState<Cart>(initialState);
  const [isOpen, setIsOpen] = useState(false);
  const getCartFromLS = () => {
    if (!IS_SERVER) {
      return localStorage.getItem(CART_KEY);
    }
    return null;
  };

  const saveCartToLS = (id: string) => {
    if (!IS_SERVER) {
      return localStorage.setItem(CART_KEY, id);
    }
  };

  const createNewCart = () => {
    cartService
      .createCart()
      .then(res => {
        setCart(res);
        saveCartToLS(res.id);
      })
      .catch(e => console.error(e));
  };

  const deleteCart = () => {
    if (!IS_SERVER) {
      localStorage.removeItem(CART_KEY);
    }
  };

  const resetCart = () => {
    deleteCart();
    createNewCart();
  };

  useEffect(() => {
    const cartId = getCartFromLS();

    if (cartId) {
      cartService
        .getCartById(cartId)
        .then(res => {
          if (!res || res.completed_at) {
            resetCart();
          }
          setCart(res);
        })
        .catch(e => {
          if (e.statusCode && e.statusCode === 404) {
            createNewCart();
          }
        });
    } else {
      createNewCart();
    }
  }, []);

  const updateCart = (payload: any) => {
    return cartService.updateCart(cart.id, payload).then(res => {
      setCart(res);
      return res;
    });
  };

  const updateOpenState = (state: boolean) => setIsOpen(state);

  const addItemToCart = (itemId: string) => {
    cartService.addItem(cart.id, itemId).then(res => setCart(res));
    // setCart(prevState => ({ ...prevState, items: [...prevState.items, item] }));
  };

  const updateCartItem = (itemId: string, data: any) => {
    cartService.updateItem(cart.id, itemId, data).then(res => setCart(res));
  };

  const removeItemFromCart = (itemId: string) => {
    cartService.removeItem(cart.id, itemId).then(res => setCart(res));
  };
  // setCart(prevState => ({
  //   ...prevState,
  //   items: prevState.items.filter(item => item.id !== itemId),
  // }));

  const shippingTotal = useMemo(() => {
    if (!cart.shipping_address?.country) {
      return 0;
    }

    if (cart.shipping_address?.country === 'Albania') {
      return 300;
    }

    if (cart.shipping_address?.country === 'United States') {
      return 1800;
    }

    return 900;
  }, [cart]);

  const subtotal = useMemo(() => {
    const subtotal = cart.items?.reduce(
      (item1, item2) =>
        item1 + (parseInt((item2.price * item2.quantity).toString()) || 0),
      0
    );

    return subtotal;
  }, [cart.items]);

  const total = subtotal + shippingTotal;

  const totalItems = (cart?.items || [])
    .map(i => i.quantity)
    .reduce((acc, curr) => acc + curr, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        total: total || 0,
        subtotal: subtotal || 0,
        shippingTotal: shippingTotal || 0,
        updateOpenState,
        addItemToCart,
        updateCartItem,
        removeItemFromCart,
        updateCart,
        setCart,
        resetCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  return context;
};
