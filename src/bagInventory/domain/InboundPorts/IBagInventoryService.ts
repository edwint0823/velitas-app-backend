import { UpdateInventoryQuantityDto } from '../../adapters/model/updateInventoryQuantity.dto';
import { IAuthUser } from '../../../../core/constants';
import { ListBagInventoryDomain } from '../model/out/listBagInventoryDomain';
import { listBagInventoryDto } from '../../adapters/model/listBagInventory.dto';

export interface IBagInventoryService {
  addOrRemoveBagInventory(
    bagId: number,
    inventoryInfo: UpdateInventoryQuantityDto,
    user: IAuthUser,
  ): Promise<{
    message: string;
  }>;

  listBagInventory(query: listBagInventoryDto): Promise<ListBagInventoryDomain[]>;
}
