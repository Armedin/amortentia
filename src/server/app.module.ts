import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigurationModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CartsModule } from './modules/carts/carts.module';
import { LineItemsModule } from './modules/line-items/line-items.module';
import { MailModule } from './modules/mail/mail.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ProductCategoriesModule } from './modules/product-categories/product-categories.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { ViewModule } from './modules/view/view.module';
import { BcryptModule } from './utilities/bcrypt/bcrypt.module';
import { ImageOptimiserModule } from './utilities/image-optimiser/image-optimiser.module';

@Module({
  imports: [
    BcryptModule,
    ImageOptimiserModule,
    DatabaseModule,
    ConfigurationModule,
    ProductsModule,
    ProductCategoriesModule,
    AuthModule,
    UsersModule,
    CartsModule,
    LineItemsModule,
    PaymentsModule,
    OrdersModule,
    MailModule,
    ViewModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
