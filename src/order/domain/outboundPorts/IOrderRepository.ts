import { ICreateOrderInfoDomain } from '../model/in/createOrderInfoDomain';
import { OrderEntity } from '../../../../database/entities/Order.entity';
import { CreateOrderStatusLogDomain } from '../../../orderStatus/domain/model/in/createOrderStatusLogDomain';
import { UpdateOrderAndDetailsDomain } from '../model/in/updateOrderAndDetailsDomain';
import { PaginateOrderFiltersDomain } from '../model/in/paginateOrderFiltersDomain';
import { OrderStatusCountDomain } from '../model/out/OrderStatusCountDomain';

export interface IOrderRepository {
  getCodeOrder(): Promise<string>;

  createOrder(orderInfo: ICreateOrderInfoDomain): Promise<OrderEntity>;

  getOrderAndDetailsByCode(code: string): Promise<OrderEntity>;

  listOrdersPaginated(
    skip: number,
    take: number,
    whereOptions: PaginateOrderFiltersDomain,
  ): Promise<{
    orders: OrderEntity[];
    total: number;
  }>;

  getOrderAndStatusByCode(code: string): Promise<OrderEntity>;

  updateStatusOrder(orderId: number, orderStatusPayload: CreateOrderStatusLogDomain): Promise<OrderEntity>;

  updateOrderAndDetails(orderAndDetailsInfo: UpdateOrderAndDetailsDomain): Promise<OrderEntity>;

  getAllOrderInfoAndBagsByCode(code: string): Promise<OrderEntity>;

  getOrderWithOnlyDetailByCode(code: string): Promise<OrderEntity>;

  totalOrder(): Promise<number>;

  totalOrderByStatus(): Promise<OrderStatusCountDomain[]>;
}

export const IOrderRepository = Symbol('IOrderRepository');
