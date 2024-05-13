import { BagInventoryEntity } from '../../../../database/entities/BagInventory.entity';
import { ListBagInventoryDomain } from '../model/out/listBagInventoryDomain';
import { inventoryStatusNames, quantityBagInventoryLowStock } from '../../../../core/constants';

export class BagInventoryMapper {
  public static listBagInventoryMapper(bags: BagInventoryEntity[]): ListBagInventoryDomain[] {
    return bags.map((bagInventory) => {
      let inventoryStatus = '';
      if (bagInventory.quantity <= quantityBagInventoryLowStock) inventoryStatus = inventoryStatusNames.lowStock;
      if (bagInventory.quantity > quantityBagInventoryLowStock) inventoryStatus = inventoryStatusNames.inStock;
      if (bagInventory.quantity === 0) inventoryStatus = inventoryStatusNames.outOfStock;

      return {
        id: bagInventory.bag_id,
        name: bagInventory.bag.name,
        quantity: bagInventory.quantity,
        inventoryStatus: inventoryStatus,
        capacity: bagInventory.bag.capacity,
      };
    });
  }
}
