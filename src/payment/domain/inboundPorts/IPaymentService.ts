import { ListPaymentsByOrderDomain } from '../model/out/ListPaymentsByOrderDomain';

export interface IPaymentService {
  getPaymentsByOrderCode(orderCode: string): Promise<ListPaymentsByOrderDomain[]>;
}
