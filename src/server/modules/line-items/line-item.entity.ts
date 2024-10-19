import { IsOptional } from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { generateEntityId } from '../../utilities/generate-entity-id';
import { Cart } from '../carts/cart.entity';
import { Order } from '../orders/order.entity';
import { Product } from '../products/product.entity';

@Entity()
export class LineItem {
  @PrimaryColumn()
  id: string;

  @Index()
  @Column({ nullable: true })
  cart_id: string;

  @ManyToOne(() => Cart, cart => cart.items)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column()
  thumbnail: string;

  @Column('decimal', { precision: 16, scale: 2 })
  price: number;

  @Index()
  @Column({ nullable: true })
  product_id: string;

  @ManyToOne(() => Product, { eager: true })
  @JoinColumn({ name: 'product_id' })
  variant: Product;

  @Index()
  @Column({ nullable: true })
  order_id: string;

  @ManyToOne(() => Order, order => order.items)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column({ type: 'int' })
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'item');
  }
}
