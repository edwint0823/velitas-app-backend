import { OrderStatusChangeLogEntity } from '../../../../database/entities/OrderStatusChangeLogs.entity';
import { EntityManager, Repository } from 'typeorm';
import { IOrderStatusRepository } from '../../domain/outboundPorts/IOrderStatusRepository';
import { Injectable } from '@nestjs/common';
import { CreateOrderStatusLogDomain } from '../../domain/model/in/createOrderStatusLogDomain';

@Injectable()
export class OrderStatusRepository extends Repository<OrderStatusChangeLogEntity> implements IOrderStatusRepository {
  createOrderStatusLogByTransaction(
    tableParams: CreateOrderStatusLogDomain,
    transaction: EntityManager,
  ): Promise<OrderStatusChangeLogEntity> {
    const newOrderStatus = new OrderStatusChangeLogEntity();
    Object.assign(newOrderStatus, tableParams);
    return transaction.save(newOrderStatus);
  }
}
