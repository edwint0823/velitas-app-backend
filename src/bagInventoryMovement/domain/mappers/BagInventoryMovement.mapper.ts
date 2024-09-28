import { BagInventoryMovementEntity } from '../../../../database/entities/BagInventoryMovement.entity';
import { ListBagInventoryMovementDomain } from '../model/out/bagInventoryMovementDomain';
import { IUserInfoInDb, timeZoneDayjs } from '../../../../core/constants';
import * as dayjs from 'dayjs';

dayjs.locale(timeZoneDayjs);

export class BagInventoryMovementMapper {
  public static listBagInventoryMovementsMapper(repositoryResponse: {
    movements: BagInventoryMovementEntity[];
    total: number;
  }): ListBagInventoryMovementDomain {
    const movements = repositoryResponse.movements.map((bagMovement) => {
      const userInfo: IUserInfoInDb = JSON.parse(bagMovement.created_by);
      return {
        id: bagMovement.id,
        bagName: bagMovement.bag.name,
        quantity: bagMovement.quantity,
        isEntry: bagMovement.is_entry,
        isOut: bagMovement.is_out,
        observation: bagMovement.observation,
        createdAt: dayjs(bagMovement.created_at).format('YYYY-MM-DD'),
        createdByName: `${userInfo.first_name} ${userInfo.last_name}`,
      };
    });
    return { movements, total: repositoryResponse.total };
  }
}
