import { CashInventoryEntity } from '../../../../database/entities/CashInventory.entity';
import { FindCashInventoryByIdDomain } from '../model/out/findCashInventoryByIdDomain';
import { ListCashInventoryDomain } from '../model/out/ListCashInventoryDomain';

export class CashInventoryMapper {
  public static findCashInventoryMapper(cashInventory: CashInventoryEntity): FindCashInventoryByIdDomain {
    return {
      name: cashInventory.name,
      quantity: cashInventory.quantity,
    };
  }

  public static listCashInventoryMapper(cashInventoryList: CashInventoryEntity[]): ListCashInventoryDomain[] {
    return cashInventoryList.map((cashInventory) => {
      return {
        name: cashInventory.name,
        quantity: cashInventory.quantity,
        unitValue: cashInventory.unit_value,
        id: cashInventory.id,
      };
    });
  }
}
