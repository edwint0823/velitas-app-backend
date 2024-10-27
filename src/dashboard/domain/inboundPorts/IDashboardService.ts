import { ProductionTotals } from '../model/out/productionTotals';

export interface IDashboardService {
  getProductionTotal(): Promise<ProductionTotals>;
}
