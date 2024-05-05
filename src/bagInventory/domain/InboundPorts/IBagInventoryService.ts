import { UpdateInventoryQuantityDto } from '../../adapters/model/updateInventoryQuantity.dto';
import { IAuthUser } from '../../../../core/constants';

export interface IBagInventoryService {
  addOrRemoveBagInventory(
    bagId: number,
    inventoryInfo: UpdateInventoryQuantityDto,
    user: IAuthUser,
  ): Promise<{
    message: string;
  }>;
}
