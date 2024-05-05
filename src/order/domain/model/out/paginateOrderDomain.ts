interface OrderInfo {
  code: string;
  total_price: number;
  total_quantity: number;
  delivery_date: Date;
  delivery_address: string;
  created_at: string;
  customer_name: string;
  customer_price_type: string;
  status_id: number;
  status_name: string;
  status_public_name: string;
  status_order: number;
}

export interface PaginateOrderDomain {
  orders: OrderInfo[];
  total: number;
}
