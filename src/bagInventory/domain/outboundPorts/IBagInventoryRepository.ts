import { EntityManager } from 'typeorm';
import { BagInventoryEntity } from '../../../../database/entities/BagInventory.entity';
import { ListAllBagsFilterDomain } from '../model/in/ListAllBagsFilterDomain';

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

  listAvailableBags(whereOptions: ListAllBagsFilterDomain): Promise<BagInventoryEntity[]>;

  getBagWithLowInventory(): Promise<BagInventoryEntity[]>;
}

export const IBagInventoryRepository = Symbol('IBagInventoryRepository');
