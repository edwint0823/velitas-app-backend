import { CandleInventoryMovementDomain } from '../model/out/candleInventoryMovementDomain';
import { CandleInventoryMovementEntity } from '../../../../database/entities/CandleInventoryMovement.entity';
import { IUserInfoInDb, timeZoneDayjs } from '../../../../core/constants';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es-mx.js';

dayjs.locale(timeZoneDayjs);

export class CandleInventoryMovementMapper {
  public static listCandleInventoryMovementsMapper(repositoryResponse: {
    movements: CandleInventoryMovementEntity[];
    total: number;
  }): CandleInventoryMovementDomain {
    const movements = repositoryResponse.movements.map((candleMovement) => {
      const userInfo: IUserInfoInDb = JSON.parse(candleMovement.created_by);
      return {
        id: candleMovement.id,
        candleName: candleMovement.candle.name,
        quantity: candleMovement.quantity,
        is_entry: candleMovement.is_entry,
        is_out: candleMovement.is_out,
        observation: candleMovement.observation,
        createdAt: dayjs(candleMovement.created_at).format('YYYY-MM-DD'),
        createdByName: `${userInfo.first_name} ${userInfo.last_name}`,
      };
    });

    return { movements, total: repositoryResponse.total };
  }
}
