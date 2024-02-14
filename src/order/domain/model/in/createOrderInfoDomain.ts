interface IOrder {
  code: string;
  total_price: number;
  total_quantity: number;
  delivery_date: Date;
  customer_id: number;
  status_id: number;
}

interface IOrderDetail {
  name_list: string;
  price: number;
  quantity: number;
  observation: string;
  candle_option_id: number;
  order_id?: number;
}

export interface IBagInventoryNeed {
  bag_id: number;
  quantity: number;
  order_id?: number;
}

export interface ICreateOrderInfoDomain {
  order: IOrder;
  orderDetails: IOrderDetail[];
  bagInventoryNeed: IBagInventoryNeed[];
}
