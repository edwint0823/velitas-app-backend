interface NameList {
  name: string;
  packAlone: boolean;
  deceased: boolean;
  pet: boolean;
}

interface OrderDetail {
  candleOptionName: string;
  candleOptionUrlImage: string;
  nameList: NameList[];
  price: number;
  quantity: number;
  observation: string;
}

export interface FindOrderAndDetailsDomain {
  customerName: string;
  totalPrice: number;
  deliveryDate: Date;
  statusName: string;
  publicStatusName: string;
  orderDetails: OrderDetail[];
}
