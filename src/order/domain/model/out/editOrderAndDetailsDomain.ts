interface CandleNameList {
  idx: number;
  name: string;
  packAlone: boolean;
  deceased: boolean;
  pet: boolean;
}

interface OrderDetails {
  id: number;
  nameList: CandleNameList[];
  price: number;
  quantity: number;
  observation: string;
  candleOptionId: number;
  nameToAdd: string;
}

export interface OrderAndDetailsDomain {
  code: string;
  customerName: string;
  customerPriceType: string;
  statusName: string;
  publicStatusName: string;
  deliveryPrice: number;
  deliveryAddress: string;
  additionalInfo: string;
  details: OrderDetails[];
}
