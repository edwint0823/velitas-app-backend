interface IPayment {
  partial: boolean;
  movement_id: number | null;
  order_id: number;
}

export interface createEntryCashMovementDomain {
  amount: number;
  concept: string;
  bank_entity_id: number;
  entry_movement: boolean;
  out_movement: boolean;
  created_by: string;
  payment: IPayment;
}
