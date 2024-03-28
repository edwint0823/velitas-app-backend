import { ICreateOrderInfoDomain } from '../model/in/createOrderInfoDomain';
import { OrderEntity } from '../../../../database/entities/Order.entity';

export interface IOrderRepository {
  getCodeOrder(): Promise<string>;

  createOrder(orderInfo: ICreateOrderInfoDomain): Promise<OrderEntity>;

  getOrderAndDetailsByCode(code: string): Promise<OrderEntity>;

  listOrdersPaginated(
    skip: number,
    take: number,
    whereOptions,
  ): Promise<{
    orders: OrderEntity[];
    total: number;
  }>;
}

export const IOrderRepository = Symbol('IOrderRepository');
