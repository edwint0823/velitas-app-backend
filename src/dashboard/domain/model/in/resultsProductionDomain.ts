import { CandleInventoryEntity } from '../../../../../database/entities/CandleInventory.entity';
import { BagInventoryEntity } from '../../../../../database/entities/BagInventory.entity';
import { BankEntityEntity } from '../../../../../database/entities/BankEntity.entity';
import { OrderStatusCountDomain } from '../../../../order/domain/model/out/OrderStatusCountDomain';

export interface ResultsProductionDomain {
  totalOrder: number;
  candleWithLowQuantity: CandleInventoryEntity[];
  BagWithLowQuantity: BagInventoryEntity[];
  allEntities: BankEntityEntity[];
  countStatusOrder: OrderStatusCountDomain[];
}
