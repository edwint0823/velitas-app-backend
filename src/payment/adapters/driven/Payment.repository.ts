import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PaymentEntity } from '../../../../database/entities/Payment.entity';
import { IPaymentRepository } from '../../domain/outboundPorts/IPaymentRepository';

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
}
