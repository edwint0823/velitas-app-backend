import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from '../../database/entities/Order.entity';
import { OrderController } from './adapters/driving/Order.controller';
import { OrderService } from './domain/inboundPorts/Order.service';
import { IConfigurationService } from '../configuration/domain/inboundPorts/IConfigurationService';
import { ConfigurationService } from '../configuration/domain/inboundPorts/Configuration.service';
import { IOrderRepository } from './domain/outboundPorts/IOrderRepository';
import { OrderRepository } from './adapters/driven/Order.repository';
import { IConfigurationRepository } from '../configuration/domain/outboundPorts/IConfigurationRepository';
import { ConfigurationRepository } from '../configuration/adapters/driven/Configuration.repository';
import { ICustomerRepository } from '../customer/domain/outboundPorts/ICustomerRepository';
import { CustomerRepository } from '../customer/adapters/driven/Customer.repository';
import { IStatusRepository } from '../status/domain/outboundPorts/IStatusRepository';
import { StatusRepository } from '../status/adapters/driven/Status.repository';
import { IBagRepository } from '../bag/domain/outboundPorts/IBagRepository';
import { BagRepository } from '../bag/adapters/driven/Bag.repository';
import { IOrderDetailRepository } from '../orderDetail/domain/outboundPorts/IOrderDetailRepository';
import { OrderDetailRepository } from '../orderDetail/adapters/driven/OrderDetail.repository';
import { IBagInventoryNeedRepository } from '../bagInventoryNeed/domain/outboundPorts/IBagInventoryNeedRepository';
import { BagInventoryNeedRepository } from '../bagInventoryNeed/adapters/driven/BagInventoryNeed.repository';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { IOrderStatusRepository } from '../orderStatus/domain/outboundPorts/IOrderStatusRepository';
import { OrderStatusRepository } from '../orderStatus/adapters/driven/OrderStatus.repository';
// eslint-disable-next-line max-len
import { ICandleInventoryMovementRepository } from '../candleInventoryMovement/domain/outboundPorts/ICandleInventoryMovementRepository';
// eslint-disable-next-line max-len
import { CandleInventoryMovementRepository } from '../candleInventoryMovement/adapters/driven/CandleInventoryMovement.repository';
import { ICandleInventoryRepository } from '../candleInventory/domain/outboundPorts/ICandleInventoryRepository';
import { CandleInventoryRepository } from '../candleInventory/adapters/driven/CandleInventory.repository';
// eslint-disable-next-line max-len
import { IBagInventoryMovementRepository } from '../bagInventoryMovement/domain/outboundPorts/IBagInventoryMovementRepository';
// eslint-disable-next-line max-len
import { BagInventoryMovementRepository } from '../bagInventoryMovement/adapters/driven/BagInventoryMovement.repository';
import { IBagInventoryRepository } from '../bagInventory/domain/outboundPorts/IBagInventoryRepository';
import { BagInventoryRepository } from '../bagInventory/adapters/driven/BagInventory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderController],
  providers: [
    OrderService,
    { provide: IOrderRepository, useClass: OrderRepository },
    { provide: IConfigurationService, useClass: ConfigurationService },
    { provide: IConfigurationRepository, useClass: ConfigurationRepository },
    { provide: ICustomerRepository, useClass: CustomerRepository },
    { provide: IStatusRepository, useClass: StatusRepository },
    { provide: IBagRepository, useClass: BagRepository },
    { provide: IOrderDetailRepository, useClass: OrderDetailRepository },
    {
      provide: IBagInventoryNeedRepository,
      useClass: BagInventoryNeedRepository,
    },
    {
      provide: IOrderStatusRepository,
      useClass: OrderStatusRepository,
    },
    { provide: ICandleInventoryRepository, useClass: CandleInventoryRepository },
    { provide: ICandleInventoryMovementRepository, useClass: CandleInventoryMovementRepository },
    { provide: IBagInventoryNeedRepository, useClass: BagInventoryNeedRepository },
    { provide: IBagInventoryMovementRepository, useClass: BagInventoryMovementRepository },
    { provide: IBagInventoryRepository, useClass: BagInventoryRepository },
  ],
})
export class OrderModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('order/paginate_list/:page_size/:page_number', 'order/update_status/:order_code/:new_status_id');
  }
}
