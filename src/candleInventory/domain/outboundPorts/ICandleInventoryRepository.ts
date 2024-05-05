import { CandleInventoryEntity } from '../../../../database/entities/CandleInventory.entity';
import { EntityManager } from 'typeorm';

export interface ICandleInventoryRepository {
  findCandleInventoryByCandleTypeId(candleTypeId: number): Promise<CandleInventoryEntity>;

  addQuantityToCandleInventoryByTransaction(
    candleTypeId: number,
    quantity: number,
    transaction: EntityManager,
  ): Promise<CandleInventoryEntity>;

  removeQuantityToCandleInventoryByTransaction(
    candleTypeId: number,
    quantity: number,
    transaction: EntityManager,
  ): Promise<CandleInventoryEntity>;
}

export const ICandleInventoryRepository = Symbol('ICandleInventoryRepository');
