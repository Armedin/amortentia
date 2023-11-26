import { IsOptional } from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { generateEntityId } from '../../utilities/generate-entity-id';
import { Cart } from '../carts/cart.entity';
import { ShippingAddress } from '../carts/interfaces/shipping-address.interface';
import { LineItem } from '../line-items/line-item.entity';
import { PaymentStatusEnum } from '../payments/enums/PaymentStatus.enum';

export enum OrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
  CANCELED = 'canceled',
  REQUIRES_ACTION = 'requires_action',
}

@Entity()
export class Order {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'enum',
    enum: PaymentStatusEnum,
    default: PaymentStatusEnum.NOT_PAID,
  })
  payment_status: string;

  @Index()
  @Column({ nullable: true })
  cart_id: string;

  @OneToOne(() => Cart)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column({ nullable: true })
  customer_id: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'simple-json', default: null })
  @IsOptional()
  shipping_address: ShippingAddress;

  @OneToMany(() => LineItem, lineItem => lineItem.order, {
    cascade: ['insert'],
  })
  items: LineItem[];

  @Column('decimal', { precision: 16, scale: 2, default: 0 })
  total: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'order');
  }
}
