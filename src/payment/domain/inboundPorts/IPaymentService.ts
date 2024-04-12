import { ListPaymentsByOrderDomain } from '../model/out/ListPaymentsByOrderDomain';

export interface IPaymentService {
  // todo implementar tipado
  getPaymentsByOrderCode(orderCode: string): Promise<ListPaymentsByOrderDomain[]>;
}
