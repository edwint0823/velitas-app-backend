interface OrderStatusChangeLog {
  id: number;
  orderCode: string;
  oldStatusName: string;
  newStatusName: string;
  createdAt: string;
  createdByName: string;
}

export interface ListOrderStatusLogsDomain {
  items: OrderStatusChangeLog[];
  total: number;
}
