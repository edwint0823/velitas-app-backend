import { UpdateCandleInventoryQuantityDto } from '../../adapters/model/updateCandleInventoryQuantity.dto';
import { IAuthUser } from '../../../../core/constants';

export interface ICandleInventoryService {
  addOrRemoveCandleInventory(
    candleTypeId: number,
    inventoryInfo: UpdateCandleInventoryQuantityDto,
    user: IAuthUser,
  ): Promise<{
    message: string;
  }>;
}
