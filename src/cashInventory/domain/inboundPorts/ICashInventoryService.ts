import { QueryDataListInventoryDto } from '../../adapters/model/queryDataListInventory.dto';
import { ListCashInventoryDomain } from '../model/out/ListCashInventoryDomain';
import { FindCashInventoryByIdDomain } from '../model/out/findCashInventoryByIdDomain';
import { UpdateQuantityToCashInventoryDto } from '../../adapters/model/updateQuantityToCashInventory.dto';

export interface ICashInventoryService {
  listCashInventory(query: QueryDataListInventoryDto): Promise<ListCashInventoryDomain[]>;

  findCashInventoryById(id: number): Promise<FindCashInventoryByIdDomain>;

  updateQuantityToCashInventory(id: number, body: UpdateQuantityToCashInventoryDto): Promise<{ message: string }>;
}
