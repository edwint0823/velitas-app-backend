export interface CreateOutMovementDomain {
  amount: number;
  concept: string;
  bank_entity_id: number;
  entry_movement: boolean;
  out_movement: boolean;
  created_by: string;
}
