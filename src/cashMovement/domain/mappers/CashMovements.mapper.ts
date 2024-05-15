import { CashMovementEntity } from '../../../../database/entities/CashMovement.entity';
import { ListCashMovementsDomain } from '../model/out/ListCashMovementsDomain';
import * as dayjs from 'dayjs';
import { timeZoneDayjs } from '../../../../core/constants';

dayjs.locale(timeZoneDayjs);

export class CashMovementsMapper {
  public static listCashMovementMapper(repositoryResponse: {
    movements: CashMovementEntity[];
    total: number;
  }): ListCashMovementsDomain {
    const movements = repositoryResponse.movements.map((cashMovement) => {
      return {
        concept: cashMovement.concept,
        amount: cashMovement.amount,
        bankEntityName: cashMovement.bank_entity.name,
        entryMovement: cashMovement.entry_movement,
        outMovement: cashMovement.out_movement,
        createdById: cashMovement.created_by,
        createdByName: '',
        createdAt: dayjs(cashMovement.created_at).format('YYYY-MM-DD'),
        isPaymentPartial: cashMovement.payment ? cashMovement.payment.partial : null,
        orderCode: cashMovement.payment ? cashMovement.payment.order.code : null,
      };
    });
    return { movements, total: repositoryResponse.total };
  }
}
