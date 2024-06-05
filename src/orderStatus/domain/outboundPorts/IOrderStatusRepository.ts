import { OrderStatusChangeLogEntity } from '../../../../database/entities/OrderStatusChangeLogs.entity';
import { CreateOrderStatusLogDomain } from '../model/in/createOrderStatusLogDomain';
import { EntityManager } from 'typeorm';
import { FilterOptionsListOrderStatusLogs } from '../model/in/filterOptionsListOrderStatusLogs';

export interface IOrderStatusRepository {
  createOrderStatusLogByTransaction(
    tableParams: CreateOrderStatusLogDomain,
    transaction: EntityManager,
  ): Promise<OrderStatusChangeLogEntity>;

  listOrdersStatusLogChanges(
    skip: number,
    take: number,
    whereOptions: FilterOptionsListOrderStatusLogs,
  ): Promise<{
    items: OrderStatusChangeLogEntity[];
    total: number;
  }>;
}

export const IOrderStatusRepository = Symbol('IOrderStatusRepository');
