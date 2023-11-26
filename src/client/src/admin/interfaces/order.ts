import { Address } from '@store/interfaces/checkout.interface';
import { LineItem } from '@store/interfaces/line-item.interface';

export type OrderStatus = 'pending' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  cart_id: string;
  created_at: string;
  email: string;
  shipping_address: Address;
  total: string;
  customer_id: string;
  payment_status: any;
  status: OrderStatus;
  items?: LineItem[];
}
