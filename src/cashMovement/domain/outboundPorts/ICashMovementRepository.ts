import { createEntryCashMovementDomain } from '../model/in/createEntryCashMovementDomain';
import { CashMovementEntity } from '../../../../database/entities/CashMovement.entity';
import { ListFilterOptionsDomain } from '../model/in/listFilterOptionsDomain';

export interface ICashMovementRepository {
  createEntryCashMovement(movement: createEntryCashMovementDomain): Promise<CashMovementEntity>;

  paginateCashMovements(
    skip: number,
    take: number,
    whereOptions: ListFilterOptionsDomain,
  ): Promise<{
    movements: CashMovementEntity[];
    total: number;
  }>;
}

export const ICashMovementRepository = Symbol.for('ICashMovementRepository');
