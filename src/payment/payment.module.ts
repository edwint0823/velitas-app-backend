import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '../../database/entities/Payment.entity';
import { PaymentController } from './adapters/driving/Payment.controller';
import { PaymentService } from './domain/inboundPorts/Payment.service';
import { IPaymentRepository } from './domain/outboundPorts/IPaymentRepository';
import { PaymentRepository } from './adapters/driven/Payment.repository';
import { IOrderRepository } from '../order/domain/outboundPorts/IOrderRepository';
import { OrderRepository } from '../order/adapters/driven/Order.repository';
import { ICashMovementRepository } from '../cashMovement/domain/outboundPorts/ICashMovementRepository';
import { CashMovementRepository } from '../cashMovement/adapters/driven/CashMovement.repository';
import { IOrderDetailRepository } from '../orderDetail/domain/outboundPorts/IOrderDetailRepository';
import { OrderDetailRepository } from '../orderDetail/adapters/driven/OrderDetail.repository';
import { IBagInventoryNeedRepository } from '../bagInventoryNeed/domain/outboundPorts/IBagInventoryNeedRepository';
import { BagInventoryNeedRepository } from '../bagInventoryNeed/adapters/driven/BagInventoryNeed.repository';
import { IOrderStatusRepository } from '../orderStatus/domain/outboundPorts/IOrderStatusRepository';
import { OrderStatusRepository } from '../orderStatus/adapters/driven/OrderStatus.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentEntity])],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    { provide: IPaymentRepository, useClass: PaymentRepository },
    {
      provide: IOrderRepository,
      useClass: OrderRepository,
    },
    { provide: IOrderDetailRepository, useClass: OrderDetailRepository },
    { provide: IBagInventoryNeedRepository, useClass: BagInventoryNeedRepository },
    { provide: IOrderStatusRepository, useClass: OrderStatusRepository },
    { provide: ICashMovementRepository, useClass: CashMovementRepository },
  ],
})
export class PaymentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('payment');
  }
}
