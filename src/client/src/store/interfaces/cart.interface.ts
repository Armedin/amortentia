import { Address } from './checkout.interface';
import { LineItem } from './line-item.interface';

export interface Cart {
  id: string;
  items?: LineItem[];
  email?: string;
  shipping_address?: Address;
  total: number;
  payment_session?: any;
}
