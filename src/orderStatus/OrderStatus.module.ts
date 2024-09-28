import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderStatusChangeLogEntity } from '../../database/entities/OrderStatusChangeLogs.entity';
import { OrderStatusController } from './adapters/driving/OrderStatus.controller';
import { OrderStatusService } from './domain/inboundPorts/OrderStatus.service';
import { IOrderStatusRepository } from './domain/outboundPorts/IOrderStatusRepository';
import { OrderStatusRepository } from './adapters/driven/OrderStatus.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OrderStatusChangeLogEntity])],
  controllers: [OrderStatusController],
  providers: [OrderStatusService, { provide: IOrderStatusRepository, useClass: OrderStatusRepository }],
})
export class OrderStatusModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('order_status_change_logs');
  }
}
