import { PaymentEntity } from '../../../../database/entities/Payment.entity';

export interface IPaymentRepository {
  getPaymentsByOrderCode(orderCode: string): Promise<PaymentEntity[]>;
}

export const IPaymentRepository = Symbol('IPaymentRepository');
