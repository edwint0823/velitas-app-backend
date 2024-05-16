interface Order {
  id: number;
  total_price: number;
  total_quantity: number;
  delivery_date: Date;
  updated_by: string;
  updated_at: Date;
  delivery_address: string;
  additional_info?: string;
  delivery_price?: number;
}

interface OrderDetail {
  name_list: string;
  price: number;
  quantity: number;
  observation: string;
  candle_option_id: number;
  order_id: number;
}

export interface BagInventoryNeed {
  bag_id: number;
  quantity: number;
  order_id: number;
}

interface CandleInventory {
  candle_type_id: number;
  quantity: number;
  is_entry: boolean;
  is_out: boolean;
  observation: string;
  created_by: string;
}

interface BagInventoryMovement {
  bag_id: number;
  quantity: number;
  is_entry: boolean;
  is_out: boolean;
  observation: string;
  created_by: string;
}

export interface UpdateOrderAndDetailsDomain {
  order: Order;
  orderDetails: OrderDetail[];
  oldCandleInventoryMovement?: CandleInventory[];
  newCandleInventoryMovement?: CandleInventory[];
  oldBagInventoryNeedMovement?: BagInventoryMovement[];
  newBagInventoryNeedMovement?: BagInventoryMovement[];
  newBagInventoryNeed: BagInventoryNeed[];
}
