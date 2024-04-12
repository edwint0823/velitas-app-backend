import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '../../database/entities/Payment.entity';
import { PaymentController } from './adapters/driving/Payment.controller';
import { PaymentService } from './domain/inboundPorts/Payment.service';
import { IPaymentRepository } from './domain/outboundPorts/IPaymentRepository';
import { PaymentRepository } from './adapters/driven/Payment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  controllers: [PaymentController],
  providers: [PaymentService, { provide: IPaymentRepository, useClass: PaymentRepository }],
})
export class PaymentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('payment');
  }
}
