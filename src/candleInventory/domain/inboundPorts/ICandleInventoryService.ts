import { UpdateCandleInventoryQuantityDto } from '../../adapters/model/updateCandleInventoryQuantity.dto';
import { IAuthUser } from '../../../../core/constants';
import { ListCandleInventoryDto } from '../../adapters/model/listCandleInventory.dto';
import { ListInventoryDomain } from '../model/out/listInventoryDomain';

export interface ICandleInventoryService {
  addOrRemoveCandleInventory(
    candleTypeId: number,
    inventoryInfo: UpdateCandleInventoryQuantityDto,
    user: IAuthUser,
  ): Promise<{
    message: string;
  }>;

  listInventory(query: ListCandleInventoryDto): Promise<ListInventoryDomain[]>;
}
