import { createOrderDto } from '../../adapters/model/orderCreate.dto';
import { createOrderResponseDomain } from '../model/out/createOrderResponseDomain';

export interface IOrderService {
  create(orderInfo: createOrderDto): Promise<createOrderResponseDomain>;

  findByCode(code: string): Promise<any>;
}
