import { createOrderDto } from '../../adapters/model/orderCreate.dto';
import { createOrderResponseDomain } from '../model/out/createOrderResponseDomain';
import { IAuthUser } from '../../../../core/constants';

export interface IOrderService {
  create(orderInfo: createOrderDto): Promise<createOrderResponseDomain>;

  // TODO AGREGAR TIPADO
  findByCode(code: string): Promise<any>;

  updateOrderStatus(order_code: string, newStatusId: number, user: IAuthUser): Promise<{ message: string }>;
}
