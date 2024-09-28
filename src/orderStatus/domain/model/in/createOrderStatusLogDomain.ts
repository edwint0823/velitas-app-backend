export interface CreateOrderStatusLogDomain {
  order_id: number;
  old_status_id: number;
  new_status_id: number;
  created_by: string;
}
