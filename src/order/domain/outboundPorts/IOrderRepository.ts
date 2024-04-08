import { ICreateOrderInfoDomain } from '../model/in/createOrderInfoDomain';
import { OrderEntity } from '../../../../database/entities/Order.entity';
import { CreateOrderStatusLogDomain } from '../../../orderStatus/domain/model/in/createOrderStatusLogDomain';

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

  getOrderByCode(code: string): Promise<OrderEntity>;

  updateStatusOrder(orderId: number, orderStatusPayload: CreateOrderStatusLogDomain): Promise<OrderEntity>;
}

export const IOrderRepository = Symbol('IOrderRepository');
