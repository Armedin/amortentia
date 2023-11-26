import { Controller, Post, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaypalOrderDto } from './dto/create-paypal-order.dto';

@Controller('api/payments')
export class PaymentsController {}
