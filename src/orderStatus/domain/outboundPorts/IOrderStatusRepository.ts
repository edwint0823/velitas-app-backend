import { OrderStatusChangeLogEntity } from '../../../../database/entities/OrderStatusChangeLogs.entity';
import { CreateOrderStatusLogDomain } from '../model/in/createOrderStatusLogDomain';
import { EntityManager } from 'typeorm';

export interface IOrderStatusRepository {
  createOrderStatusLogByTransaction(
    tableParams: CreateOrderStatusLogDomain,
    transaction: EntityManager,
  ): Promise<OrderStatusChangeLogEntity>;
}

export const IOrderStatusRepository = Symbol('IOrderStatusRepository');
