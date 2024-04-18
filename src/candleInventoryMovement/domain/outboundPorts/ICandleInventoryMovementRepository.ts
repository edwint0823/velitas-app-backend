import { CreateEntryCandleInventoryMovementDomain } from '../model/in/createEntryCandleInventoryMovementDomain';
import { CandleInventoryMovementEntity } from '../../../../database/entities/CandleInventoryMovement.entity';
import { CreateOutCandleInventoryMovementDomain } from '../model/in/createOutCandleInventoryMovementDomain';

export interface ICandleInventoryMovementRepository {
  createEntryCandleInventoryMovement(
    entryData: CreateEntryCandleInventoryMovementDomain,
  ): Promise<CandleInventoryMovementEntity>;

  createOutCandleInventoryMovement(
    outData: CreateOutCandleInventoryMovementDomain,
  ): Promise<CandleInventoryMovementEntity>;
}

export const ICandleInventoryMovementRepository = Symbol('ICandleInventoryMovementRepository');
