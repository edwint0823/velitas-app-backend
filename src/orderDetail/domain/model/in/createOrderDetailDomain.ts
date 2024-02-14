export interface IOrderDetail {
  name_list: string;
  price: number;
  quantity: number;
  observation: string;
  candle_option_id: number;
  order_id?: number;
}
