import { createEntryCashMovementDomain } from '../model/in/createEntryCashMovementDomain';
import { CashMovementEntity } from '../../../../database/entities/CashMovement.entity';

export interface ICashMovementRepository {
  createEntryCashMovement(movement: createEntryCashMovementDomain): Promise<CashMovementEntity>;
}

export const ICashMovementRepository = Symbol.for('ICashMovementRepository');
