import { IOrderDetail } from '../model/in/createOrderDetailDomain';
import { EntityManager } from 'typeorm';
import { OrderDetailEntity } from '../../../../database/entities/OrderDetail.entity';

export interface IOrderDetailRepository {
  createOrderDetailByTransactionId(
    orderDetail: IOrderDetail,
    transaction: EntityManager,
  ): Promise<OrderDetailEntity>;
}

export const IOrderDetailRepository = Symbol('IOrderDetailRepository');
