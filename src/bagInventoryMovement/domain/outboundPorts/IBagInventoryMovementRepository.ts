import { CreateEntryInventoryMovementDomain } from '../model/in/createEntryInventoryMovementDomain';
import { BagInventoryMovementEntity } from '../../../../database/entities/BagInventoryMovement.entity';
import { CreateOutInventoryMovementDomain } from '../model/in/createOutInventoryMovementDomain';

export interface IBagInventoryMovementRepository {
  createEntryInventoryMovement(entryData: CreateEntryInventoryMovementDomain): Promise<BagInventoryMovementEntity>;

  createOutInventoryMovement(outData: CreateOutInventoryMovementDomain): Promise<BagInventoryMovementEntity>;
}

export const IBagInventoryMovementRepository = Symbol('IBagInventoryMovementRepository');
