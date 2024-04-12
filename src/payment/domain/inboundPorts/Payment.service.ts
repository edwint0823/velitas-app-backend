import { Inject, Injectable } from '@nestjs/common';
import { IPaymentService } from './IPaymentService';
import { IPaymentRepository } from '../outboundPorts/IPaymentRepository';
import { ListPaymentsByOrderDomain } from '../model/out/ListPaymentsByOrderDomain';
import { PaymentMapper } from '../mappers/Payment.mapper';

@Injectable()
export class PaymentService implements IPaymentService {
  constructor(
    @Inject(IPaymentRepository)
    private readonly paymentRepository: IPaymentRepository,
  ) {}

  async getPaymentsByOrderCode(orderCode: string): Promise<ListPaymentsByOrderDomain[]> {
    const payments = await this.paymentRepository.getPaymentsByOrderCode(orderCode);
    return PaymentMapper.listPaymentsByOrderMapper(payments);
  }
}
