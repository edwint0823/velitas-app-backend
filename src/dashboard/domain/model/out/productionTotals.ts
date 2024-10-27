interface orderStatusCount {
  value: number;
  name: string;
}

export interface ProductionTotals {
  orders: number;
  minInventoryCandle: string;
  quantityMinInventoryCandle: number;
  minInventoryBag: string;
  quantityMinInventoryBag: number;
  totalMoney: number;
  orderStatusGraphic: orderStatusCount[];
}
