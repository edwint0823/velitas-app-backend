import { CreateEntryInventoryMovementDomain } from '../model/in/createEntryInventoryMovementDomain';
import { BagInventoryMovementEntity } from '../../../../database/entities/BagInventoryMovement.entity';
import { CreateOutInventoryMovementDomain } from '../model/in/createOutInventoryMovementDomain';
import { EntityManager } from 'typeorm';
import { FiltersListBagInventoryMovementDomain } from '../model/in/filtersListBagInventoryMovementDomain';

export interface IBagInventoryMovementRepository {
  createEntryInventoryMovement(entryData: CreateEntryInventoryMovementDomain): Promise<BagInventoryMovementEntity>;

  createOutInventoryMovement(outData: CreateOutInventoryMovementDomain): Promise<BagInventoryMovementEntity>;

  createEntryInventoryMovementByTransaction(
    entryData: CreateEntryInventoryMovementDomain,
    transaction: EntityManager,
  ): Promise<BagInventoryMovementEntity>;

  createOutInventoryMovementByTransaction(
    outData: CreateOutInventoryMovementDomain,
    transaction: EntityManager,
  ): Promise<BagInventoryMovementEntity>;

  listAllBagInventoryMovements(
    skip: number,
    take: number,
    whereOptions: FiltersListBagInventoryMovementDomain,
  ): Promise<{
    movements: BagInventoryMovementEntity[];
    total: number;
  }>;
}

export const IBagInventoryMovementRepository = Symbol('IBagInventoryMovementRepository');
