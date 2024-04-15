import { PaymentEntity } from '../../../../database/entities/Payment.entity';
import { EntityManager } from 'typeorm';
import { CreatePaymentDomain } from '../model/in/CreatePaymentDomain';

export interface IPaymentRepository {
  getPaymentsByOrderCode(orderCode: string): Promise<PaymentEntity[]>;

  createPaymentByTransaction(payment: CreatePaymentDomain, transaction: EntityManager): Promise<PaymentEntity>;
}

export const IPaymentRepository = Symbol('IPaymentRepository');
