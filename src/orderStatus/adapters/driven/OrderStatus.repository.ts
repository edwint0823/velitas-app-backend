import { OrderStatusChangeLogEntity } from '../../../../database/entities/OrderStatusChangeLogs.entity';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { IOrderStatusRepository } from '../../domain/outboundPorts/IOrderStatusRepository';
import { Injectable } from '@nestjs/common';
import { CreateOrderStatusLogDomain } from '../../domain/model/in/createOrderStatusLogDomain';
import { FilterOptionsListOrderStatusLogs } from '../../domain/model/in/filterOptionsListOrderStatusLogs';

@Injectable()
export class OrderStatusRepository extends Repository<OrderStatusChangeLogEntity> implements IOrderStatusRepository {
  constructor(public readonly dataSource: DataSource) {
    super(OrderStatusChangeLogEntity, dataSource.createEntityManager());
  }

  createOrderStatusLogByTransaction(
    tableParams: CreateOrderStatusLogDomain,
    transaction: EntityManager,
  ): Promise<OrderStatusChangeLogEntity> {
    const newOrderStatus = new OrderStatusChangeLogEntity();
    Object.assign(newOrderStatus, tableParams);
    return transaction.save(newOrderStatus);
  }

  async listOrdersStatusLogChanges(
    skip: number,
    take: number,
    whereOptions: FilterOptionsListOrderStatusLogs,
  ): Promise<{
    items: OrderStatusChangeLogEntity[];
    total: number;
  }> {
    const items = await this.find({
      where: { ...whereOptions },
      relations: {
        order: true,
        old_status: true,
        new_status: true,
      },
      take: take,
      skip: skip,
      order: { created_at: 'DESC' },
    });

    const total = await this.count({ where: { ...whereOptions } });
    return { items, total };
  }
}
