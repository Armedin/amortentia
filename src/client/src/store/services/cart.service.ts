import { Product } from '@admin/interfaces/product';
import apiAxios from '@admin/lib/api';
import { Cart } from '@store/interfaces/cart.interface';

const createCart = () => {
  return apiAxios.post<Cart, any>('/carts');
};

const getCartById = (id: string) => {
  return apiAxios.get<Cart, any>(`/carts/${id}`);
};

const updateCart = (id: string, data: any) => {
  return apiAxios.post<any, any>(`/carts/${id}`, data);
};

const addItem = (cartId: string, itemId: string) => {
  return apiAxios.post<any, any>(`/carts/${cartId}/line-items`, {
    productId: itemId,
  });
};

const removeItem = (cartId: string, itemId: string) => {
  return apiAxios.delete<any, any>(`/carts/${cartId}/line-items/${itemId}`);
};

const updateItem = (cartId: string, itemId: string, data: any) => {
  return apiAxios.put<any, any>(`/carts/${cartId}/line-items/${itemId}`, data);
};

const createPaymentSession = (cartId: string) => {
  return apiAxios.post<any, any>(`/carts/${cartId}/payment-session`);
};

const createPaypalOrder = (cartId: string, data: any) => {
  return apiAxios.post<any, any>(`/carts/${cartId}/create-paypal-order`);
};

const capturePaypalOrderPayment = (cartId: string, orderId: string) => {
  return apiAxios.post<any, any>(`/carts/${cartId}/capture-paypal-order`, {
    orderId,
  });
};

const completePayment = (cartId: string) => {
  return apiAxios.post<any, any>(`/carts/${cartId}/complete`);
};

export const cartService = {
  createCart,
  updateCart,
  getCartById,
  addItem,
  removeItem,
  createPaymentSession,
  completePayment,
  createPaypalOrder,
  capturePaypalOrderPayment,
  updateItem,
};
