interface candleInventoryMovement {
  id: number;
  candleName: string;
  quantity: number;
  is_entry: boolean;
  is_out: boolean;
  observation: string;
  createdAt: string;
  createdByName: string;
}

export interface CandleInventoryMovementDomain {
  movements: candleInventoryMovement[];
  total: number;
}
