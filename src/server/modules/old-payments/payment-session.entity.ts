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
  OneToOne,
  PrimaryColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { generateEntityId } from '../../utilities/generate-entity-id';
import { Cart } from '../carts/cart.entity';
import { Product } from '../products/product.entity';
import { PaymentSessionStatusEnum } from './enums/PaymentSessionStatus.enum';

@Entity()
export class PaymentSession {
  @PrimaryColumn()
  id: string;

  @Index()
  @Column()
  cart_id: string;

  @OneToOne(() => Cart, cart => cart.payment_session)
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;

  @Column({ default: 'stripe' })
  provider: string;

  @Column({
    type: 'enum',
    enum: PaymentSessionStatusEnum,
    default: PaymentSessionStatusEnum.PENDING,
  })
  status: string;

  @Column({ type: 'simple-json' })
  data: Record<string, unknown>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'ps');
  }
}
