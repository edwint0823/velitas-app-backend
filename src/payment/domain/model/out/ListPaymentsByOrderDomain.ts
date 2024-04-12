export interface ListPaymentsByOrderDomain {
  id: number;
  partial: boolean;
  movement_amount: number;
  movement_concept: string;
  movement_created_at: string;
  bank_entity_name: string;
}
