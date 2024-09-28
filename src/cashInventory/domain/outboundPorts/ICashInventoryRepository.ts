import { FilterOptionsForListInventoryDomain } from '../model/in/FilterOptionsForListInventoryDomain';
import { CashInventoryEntity } from '../../../../database/entities/CashInventory.entity';

export interface ICashInventoryRepository {
  listInventory(whereOptions: FilterOptionsForListInventoryDomain): Promise<CashInventoryEntity[]>;

  findCashInventoryById(id: number): Promise<CashInventoryEntity>;

  updateCashInventoryQuantity(id: number, quantity: number): Promise<CashInventoryEntity>;
}

export const ICashInventoryRepository = Symbol('ICashInventoryRepository');
