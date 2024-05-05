import { createOrderDto } from '../../adapters/model/orderCreate.dto';
import { createOrderResponseDomain } from '../model/out/createOrderResponseDomain';
import { IAuthUser } from '../../../../core/constants';
import { FindOrderAndDetailsDomain } from '../model/out/findOrderAndDetailsDomain';

export interface IOrderService {
  create(orderInfo: createOrderDto): Promise<createOrderResponseDomain>;

  findByCode(code: string): Promise<FindOrderAndDetailsDomain>;

  updateOrderStatus(order_code: string, newStatusId: number, user: IAuthUser): Promise<{ message: string }>;
}
