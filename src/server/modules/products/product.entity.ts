import { IsOptional } from 'class-validator';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { generateEntityId } from '../../utilities/generate-entity-id';
import { ProductCategory } from '../product-categories/product-category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  description: string;

  @Column()
  thumbnail: string;

  @Column('decimal', { precision: 16, scale: 2 })
  price: number;

  @Column({ type: 'simple-array' })
  @IsOptional()
  images: string[];

  @Column({ type: 'simple-json' })
  @IsOptional()
  properties: { name: string; value: string }[];

  @ManyToOne(() => ProductCategory, productCategory => productCategory.products)
  @JoinColumn({ name: 'category_id' })
  category?: ProductCategory;

  @RelationId((product: Product) => product.category)
  @Column({ nullable: true })
  @Index()
  category_id?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'product');
  }
}
