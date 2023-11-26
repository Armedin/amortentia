import { IsOptional } from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { generateEntityId } from '../../utilities/generate-entity-id';
import { LineItem } from '../line-items/line-item.entity';
import { PaymentSession } from '../payments/payment-session.entity';
import { Product } from '../products/product.entity';
import { ShippingAddress } from './interfaces/shipping-address.interface';

@Entity()
export class Cart {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  email: string;

  @Column({ type: 'simple-json', default: null })
  @IsOptional()
  shipping_address: ShippingAddress;

  // @ManyToMany(() => Product, {
  //   cascade: true,
  // })
  // @JoinTable({
  //   name: 'cart_items',
  //   joinColumn: {
  //     name: 'cart_id',
  //     referencedColumnName: 'id',
  //   },
  //   inverseJoinColumn: {
  //     name: 'product_id',
  //     referencedColumnName: 'id',
  //   },
  // })
  // @IsOptional()
  // items: Product[];
  @OneToMany(() => LineItem, lineItem => lineItem.cart, {
    cascade: ['insert', 'remove'],
  })
  items: LineItem[];

  @OneToOne(() => PaymentSession, paymentSession => paymentSession.cart)
  payment_session: PaymentSession | null;

  @Column({ nullable: true })
  customer_id: string;

  @Column('decimal', { precision: 16, scale: 2, default: 0 })
  subtotal: number;

  @Column('decimal', { precision: 16, scale: 2, default: 0 })
  shipping_total: number;

  @Column('decimal', { precision: 16, scale: 2, default: 0 })
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: 'datetime', nullable: true })
  completed_at?: Date;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'cart');
  }
}
