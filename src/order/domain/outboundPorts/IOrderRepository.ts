import { ICreateOrderInfoDomain } from '../model/in/createOrderInfoDomain';
import { OrderEntity } from '../../../../database/entities/Order.entity';

export interface IOrderRepository {
  getCodeOrder(): Promise<string>;

  createOrder(orderInfo: ICreateOrderInfoDomain): Promise<OrderEntity>;
}

export const IOrderRepository = Symbol('IOrderRepository');
