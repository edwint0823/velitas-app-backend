import { CandleInventoryEntity } from '../../../../database/entities/CandleInventory.entity';
import { ListInventoryDomain } from '../model/out/listInventoryDomain';
import { quantityInventoryLowStock } from '../../../../core/constants';

export class CandleInventoryMapper {
  public static listCandleInventory(entityList: CandleInventoryEntity[]): ListInventoryDomain[] {
    return entityList.map((candleInventory) => {
      let inventoryStatus = '';
      if (candleInventory.quantity <= quantityInventoryLowStock) inventoryStatus = 'STOCK BAJO';
      if (candleInventory.quantity > quantityInventoryLowStock) inventoryStatus = 'EN STOCK';
      if (candleInventory.quantity === 0) inventoryStatus = 'AGOTADO';

      return {
        id: candleInventory.candle_type_id,
        name: candleInventory.candle.name,
        quantity: candleInventory.quantity,
        inventoryStatus: inventoryStatus,
      };
    });
  }
}
