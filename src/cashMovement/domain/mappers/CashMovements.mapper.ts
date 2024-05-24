import { CashMovementEntity } from '../../../../database/entities/CashMovement.entity';
import { ListCashMovementsDomain } from '../model/out/ListCashMovementsDomain';
import * as dayjs from 'dayjs';
import { IUserInfoInDb, timeZoneDayjs } from '../../../../core/constants';

dayjs.locale(timeZoneDayjs);

export class CashMovementsMapper {
  public static listCashMovementMapper(repositoryResponse: {
    movements: CashMovementEntity[];
    total: number;
  }): ListCashMovementsDomain {
    const movements = repositoryResponse.movements.map((cashMovement) => {
      const userInfo: IUserInfoInDb = JSON.parse(cashMovement.created_by);
      return {
        concept: cashMovement.concept,
        amount: cashMovement.amount,
        bankEntityName: cashMovement.bank_entity.name,
        entryMovement: cashMovement.entry_movement,
        outMovement: cashMovement.out_movement,
        createdById: userInfo.id,
        createdByName: `${userInfo.first_name} ${userInfo.last_name}`,
        createdAt: dayjs(cashMovement.created_at).format('YYYY-MM-DD'),
        isPaymentPartial: cashMovement.payment ? cashMovement.payment.partial : null,
        orderCode: cashMovement.payment ? cashMovement.payment.order.code : null,
      };
    });
    return { movements, total: repositoryResponse.total };
  }
}
