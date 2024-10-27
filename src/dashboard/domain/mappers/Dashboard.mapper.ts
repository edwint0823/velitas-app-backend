import { ProductionTotals } from '../model/out/productionTotals';
import { ResultsProductionDomain } from '../model/in/resultsProductionDomain';

export class DashboardMapper {
  public static totalProductionMapper(results: ResultsProductionDomain): ProductionTotals {
    return {
      orders: results.totalOrder,
      minInventoryBag: results.BagWithLowQuantity[0].bag.name,
      quantityMinInventoryBag: results.BagWithLowQuantity[0].quantity,
      minInventoryCandle: results.candleWithLowQuantity[0].candle.name,
      quantityMinInventoryCandle: results.candleWithLowQuantity[0].quantity,
      totalMoney: results.allEntities.reduce((acc, val) => acc + val.amount, 0),
      orderStatusGraphic: results.countStatusOrder.map((status) => {
        return {
          value: parseInt(status.cantidad),
          name: status.estado,
        };
      }),
    };
  }
}
