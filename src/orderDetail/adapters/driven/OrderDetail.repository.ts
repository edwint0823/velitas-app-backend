import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { OrderDetailEntity } from '../../../../database/entities/OrderDetail.entity';
import { IOrderDetailRepository } from '../../domain/outboundPorts/IOrderDetailRepository';
import { IOrderDetail } from '../../domain/model/in/createOrderDetailDomain';

@Injectable()
export class OrderDetailRepository
  extends Repository<OrderDetailEntity>
  implements IOrderDetailRepository
{
  async createOrderDetailByTransactionId(
    orderDetail: IOrderDetail,
    transaction: EntityManager,
  ): Promise<OrderDetailEntity> {
    const newOrderDetail = new OrderDetailEntity();
    Object.assign(newOrderDetail, orderDetail);
    return transaction.save(newOrderDetail);
  }
}
