export interface createOrderResponseDomain {
  message: string;
  totalPrice: number;
  totalQuantity: number;
  estimatedDelivered: Date;
  orderCode: string;
}
