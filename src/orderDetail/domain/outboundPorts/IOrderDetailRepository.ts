import { IOrderDetail } from '../model/in/createOrderDetailDomain';
import { DeleteResult, EntityManager } from 'typeorm';
import { OrderDetailEntity } from '../../../../database/entities/OrderDetail.entity';

export interface IOrderDetailRepository {
  createOrderDetailByTransaction(orderDetail: IOrderDetail, transaction: EntityManager): Promise<OrderDetailEntity>;

  deleteDetailsByOrderIdWithTransaction(orderId: number, transaction: EntityManager): Promise<DeleteResult>;
}

export const IOrderDetailRepository = Symbol('IOrderDetailRepository');
