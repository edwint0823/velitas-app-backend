import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { PaymentEntity } from '../../../../database/entities/Payment.entity';
import { IPaymentRepository } from '../../domain/outboundPorts/IPaymentRepository';
import { CreatePaymentDomain } from '../../domain/model/in/CreatePaymentDomain';

@Injectable()
export class PaymentRepository extends Repository<PaymentEntity> implements IPaymentRepository {
  constructor(public readonly dataSource: DataSource) {
    super(PaymentEntity, dataSource.createEntityManager());
  }

  getPaymentsByOrderCode(orderCode: string): Promise<PaymentEntity[]> {
    return this.find({
      relations: {
        movement: {
          bank_entity: true,
        },
        order: true,
      },
      where: {
        movement: {
          entry_movement: true,
          out_movement: false,
        },
        order: {
          code: orderCode,
        },
      },
    });
  }

  createPaymentByTransaction(payment: CreatePaymentDomain, transaction: EntityManager): Promise<PaymentEntity> {
    const newPayment = new PaymentEntity();
    Object.assign(newPayment, payment);
    return transaction.save(newPayment);
  }
}
