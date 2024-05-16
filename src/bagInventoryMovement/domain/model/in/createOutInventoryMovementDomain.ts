export interface CreateOutInventoryMovementDomain {
  bag_id: number;
  quantity: number;
  is_entry: boolean;
  is_out: boolean;
  observation: string;
  created_by: string;
}
