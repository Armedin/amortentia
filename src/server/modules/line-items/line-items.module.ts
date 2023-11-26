import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { LineItem } from './line-item.entity';
import { LineItemsController } from './line-items.controller';
import { LineItemsService } from './line-items.service';

@Module({
  imports: [TypeOrmModule.forFeature([LineItem]), ProductsModule],
  controllers: [LineItemsController],
  providers: [LineItemsService],
  exports: [LineItemsService],
})
export class LineItemsModule {}
