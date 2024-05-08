import { CandleInventoryEntity } from '../../../../database/entities/CandleInventory.entity';
import { ListInventoryDomain } from '../model/out/listInventoryDomain';

export class CandleInventoryMapper {
  public static listCandleInventory(entityList: CandleInventoryEntity[]): ListInventoryDomain[] {
    return entityList.map((candleInventory) => {
      return {
        name: candleInventory.candle.name,
        quantity: candleInventory.quantity,
      };
    });
  }
}
