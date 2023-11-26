import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { PaymentSession } from './payment-session.entity';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { TotalsService } from '../../utilities/totals/totals.service';

@Module({
  imports: [
    StripeModule.forRoot(StripeModule, {
      apiKey: process.env.STRIPE_SECRET_KEY,
      // webhookConfig: {
      //   stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
      // },
    }),
    TypeOrmModule.forFeature([PaymentSession]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}
