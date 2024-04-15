import { Injectable } from '@nestjs/common';
import { PaymentEntity } from '../../../../database/entities/Payment.entity';
import { ListPaymentsByOrderDomain } from '../model/out/ListPaymentsByOrderDomain';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es-mx.js';
import { timeZoneDayjs } from '../../../../core/constants';

dayjs.locale(timeZoneDayjs);

@Injectable()
export class PaymentMapper {
  public static listPaymentsByOrderMapper(payments: PaymentEntity[]): ListPaymentsByOrderDomain[] {
    return payments.map((payment) => {
      return {
        id: payment.id,
        partial: payment.partial,
        movement_amount: payment.movement.amount,
        movement_concept: payment.movement.concept,
        movement_created_at: dayjs(payment.movement.created_at).format('YYYY-MM-DD h:mm a'),
        bank_entity_name: payment.movement.bank_entity.name,
      };
    });
  }
}
