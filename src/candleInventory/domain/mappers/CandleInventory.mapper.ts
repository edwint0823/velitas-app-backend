import { CandleInventoryEntity } from '../../../../database/entities/CandleInventory.entity';
import { ListInventoryDomain } from '../model/out/listInventoryDomain';
import { inventoryStatusNames, quantityCandleInventoryLowStock } from '../../../../core/constants';

export class CandleInventoryMapper {
  public static listCandleInventory(entityList: CandleInventoryEntity[]): ListInventoryDomain[] {
    return entityList.map((candleInventory) => {
      let inventoryStatus = '';
      if (candleInventory.quantity <= quantityCandleInventoryLowStock) inventoryStatus = inventoryStatusNames.lowStock;
      if (candleInventory.quantity > quantityCandleInventoryLowStock) inventoryStatus = inventoryStatusNames.inStock;
      if (candleInventory.quantity === 0) inventoryStatus = inventoryStatusNames.outOfStock;

      return {
        id: candleInventory.candle_type_id,
        name: candleInventory.candle.name,
        quantity: candleInventory.quantity,
        inventoryStatus: inventoryStatus,
      };
    });
  }
}
