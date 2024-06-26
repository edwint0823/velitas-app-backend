import { createOrderDto } from '../../adapters/model/orderCreate.dto';
import { OrderUpdateDto } from '../../adapters/model/orderUpdate.dto';
import { createOrderResponseDomain } from '../model/out/createOrderResponseDomain';
import { FindOrderAndDetailsDomain } from '../model/out/findOrderAndDetailsDomain';
import { IAuthUser } from '../../../../core/constants';
import { OrderDetailsAndBagsDomain } from '../model/out/orderDetailsAndBagsDomain';
import { OrderAndDetailsDomain } from '../model/out/editOrderAndDetailsDomain';

export interface IOrderService {
  create(orderInfo: createOrderDto): Promise<createOrderResponseDomain>;

  findByCode(code: string): Promise<FindOrderAndDetailsDomain>;

  updateOrderStatus(order_code: string, newStatusId: number, user: IAuthUser): Promise<{ message: string }>;

  updateOrderAndDetail(orderCode: string, orderData: OrderUpdateDto, user: IAuthUser): Promise<{ message: string }>;

  getOrderDetailsAndBagsByCode(orderCode: string): Promise<OrderDetailsAndBagsDomain>;

  editOrderByCode(orderCode: string): Promise<OrderAndDetailsDomain>;
}
