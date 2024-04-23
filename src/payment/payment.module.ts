import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentEntity } from '../../database/entities/Payment.entity';
import { PaymentController } from './adapters/driving/Payment.controller';
import { PaymentService } from './domain/inboundPorts/Payment.service';
import { PaymentRepository } from './adapters/driven/Payment.repository';
import { OrderRepository } from '../order/adapters/driven/Order.repository';
import { CashMovementRepository } from '../cashMovement/adapters/driven/CashMovement.repository';
import { OrderDetailRepository } from '../orderDetail/adapters/driven/OrderDetail.repository';
import { BagInventoryNeedRepository } from '../bagInventoryNeed/adapters/driven/BagInventoryNeed.repository';
import { OrderStatusRepository } from '../orderStatus/adapters/driven/OrderStatus.repository';
// eslint-disable-next-line max-len
import { CandleInventoryMovementRepository } from '../candleInventoryMovement/adapters/driven/CandleInventoryMovement.repository';
// eslint-disable-next-line max-len
import { BagInventoryMovementRepository } from '../bagInventoryMovement/adapters/driven/BagInventoryMovement.repository';
import { CandleInventoryRepository } from '../candleInventory/adapters/driven/CandleInventory.repository';
import { BagInventoryRepository } from '../bagInventory/adapters/driven/BagInventory.repository';
import { IPaymentRepository } from './domain/outboundPorts/IPaymentRepository';
import { IOrderRepository } from '../order/domain/outboundPorts/IOrderRepository';
import { ICashMovementRepository } from '../cashMovement/domain/outboundPorts/ICashMovementRepository';
import { IOrderDetailRepository } from '../orderDetail/domain/outboundPorts/IOrderDetailRepository';
import { IBagInventoryNeedRepository } from '../bagInventoryNeed/domain/outboundPorts/IBagInventoryNeedRepository';
import { IOrderStatusRepository } from '../orderStatus/domain/outboundPorts/IOrderStatusRepository';
// eslint-disable-next-line max-len
import { ICandleInventoryMovementRepository } from '../candleInventoryMovement/domain/outboundPorts/ICandleInventoryMovementRepository';
// eslint-disable-next-line max-len
import { IBagInventoryMovementRepository } from '../bagInventoryMovement/domain/outboundPorts/IBagInventoryMovementRepository';
import { ICandleInventoryRepository } from '../candleInventory/domain/outboundPorts/ICandleInventoryRepository';
import { IBagInventoryRepository } from '../bagInventory/domain/outboundPorts/IBagInventoryRepository';

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
    { provide: ICandleInventoryMovementRepository, useClass: CandleInventoryMovementRepository },
    { provide: ICandleInventoryRepository, useClass: CandleInventoryRepository },
    { provide: IBagInventoryMovementRepository, useClass: BagInventoryMovementRepository },
    { provide: IBagInventoryRepository, useClass: BagInventoryRepository },
  ],
})
export class PaymentModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('payment');
  }
}
