import { ListPaymentsByOrderDomain } from '../model/out/ListPaymentsByOrderDomain';
import { CreatePaymentDto } from '../../adapters/model/createPayment.dto';
import { IAuthUser } from '../../../../core/constants';

export interface IPaymentService {
  getPaymentsByOrderCode(orderCode: string): Promise<ListPaymentsByOrderDomain[]>;

  createPaymentForOrder(payment: CreatePaymentDto, user: IAuthUser): Promise<{ message: string }>;
}
