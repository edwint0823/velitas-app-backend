import { EntityManager } from 'typeorm';
import { BagInventoryEntity } from '../../../../database/entities/BagInventory.entity';

export interface IBagInventoryRepository {
  findBagInventoryByBagId(bagId: number): Promise<BagInventoryEntity>;

  addQuantityToBagInventoryByTransaction(
    bagId: number,
    quantity: number,
    transaction: EntityManager,
  ): Promise<BagInventoryEntity>;

  removeQuantityToBagInventoryByTransaction(
    bagId: number,
    quantity: number,
    transaction: EntityManager,
  ): Promise<BagInventoryEntity>;

  listAvailableBags(whereOptions): Promise<BagInventoryEntity[]>;
}

export const IBagInventoryRepository = Symbol('IBagInventoryRepository');
