import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { DashboardController } from './adapters/driving/Dashboard.controller';
import { DashboardService } from './domain/inboundPorts/Dashboard.service';
import { IOrderRepository } from '../order/domain/outboundPorts/IOrderRepository';
import { OrderRepository } from '../order/adapters/driven/Order.repository';
import { ICandleInventoryRepository } from '../candleInventory/domain/outboundPorts/ICandleInventoryRepository';
import { CandleInventoryRepository } from '../candleInventory/adapters/driven/CandleInventory.repository';
import { IBagInventoryRepository } from '../bagInventory/domain/outboundPorts/IBagInventoryRepository';
import { BagInventoryRepository } from '../bagInventory/adapters/driven/BagInventory.repository';
import { IBankEntityRepository } from '../bankEntity/domain/outboundPorts/IBankEntityRepository';
import { BankEntityRepository } from '../bankEntity/adapters/driven/BankEntity.repository';
import { IOrderDetailRepository } from '../orderDetail/domain/outboundPorts/IOrderDetailRepository';
import { OrderDetailRepository } from '../orderDetail/adapters/driven/OrderDetail.repository';
import { IBagInventoryNeedRepository } from '../bagInventoryNeed/domain/outboundPorts/IBagInventoryNeedRepository';
import { IOrderStatusRepository } from '../orderStatus/domain/outboundPorts/IOrderStatusRepository';
import { OrderStatusRepository } from '../orderStatus/adapters/driven/OrderStatus.repository';
import { ICandleInventoryMovementRepository } from '../candleInventoryMovement/domain/outboundPorts/ICandleInventoryMovementRepository';
import { CandleInventoryMovementRepository } from '../candleInventoryMovement/adapters/driven/CandleInventoryMovement.repository';
import { IBagInventoryMovementRepository } from '../bagInventoryMovement/domain/outboundPorts/IBagInventoryMovementRepository';
import { BagInventoryMovementRepository } from '../bagInventoryMovement/adapters/driven/BagInventoryMovement.repository';

@Module({
  imports: [],
  controllers: [DashboardController],
  providers: [
    DashboardService,
    {
      provide: IOrderRepository,
      useClass: OrderRepository,
    },
    {
      provide: ICandleInventoryRepository,
      useClass: CandleInventoryRepository,
    },
    {
      provide: IBagInventoryRepository,
      useClass: BagInventoryRepository,
    },
    {
      provide: IBankEntityRepository,
      useClass: BankEntityRepository,
    },
    {
      provide: IOrderDetailRepository,
      useClass: OrderDetailRepository,
    },
    {
      provide: IBagInventoryNeedRepository,
      useClass: BagInventoryRepository,
    },
    {
      provide: IOrderStatusRepository,
      useClass: OrderStatusRepository,
    },
    {
      provide: ICandleInventoryMovementRepository,
      useClass: CandleInventoryMovementRepository,
    },
    {
      provide: IBagInventoryMovementRepository,
      useClass: BagInventoryMovementRepository,
    },
  ],
})
export class DashboardModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('dashboard');
  }
}
