import { Order } from '@admin/interfaces/order';
import apiAxios from '@admin/lib/api';

const getAllOrders = () => {
  return apiAxios.get<Order[], any>('/orders');
};

const getOrderById = (id: string) => {
  return apiAxios.get<Order, any>(`/orders/${id}`);
};

export const orderService = {
  getAllOrders,
  getOrderById,
};
