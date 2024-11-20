interface INameList {
  name: string;
  packAlone: boolean;
  deceased: boolean;
  pet: boolean;
}

interface IOrderDetailsInfo {
  candleOptionName: string;
  candleOptionUrlImage: string;
  nameList: INameList[];
  price: number;
  quantity: number;
  observation: string;
}

interface IBagsNeed {
  name: string;
  quantity: number;
}

interface IOrderPayments {
  isPartial: boolean;
  amount: number;
  concept: string;
  createdAt: string;
  bankEntityName: string;
}

export interface OrderDetailsAndBagsDomain {
  code: string;
  totalPrice: number;
  totalQuantity: number;
  deliveryDate: string;
  deliveryPrice: number | null;
  deliveryAddress: string;
  additionalInfo: string | null;
  createdAt: string;
  customerName: string;
  customerPriceType: string;
  customerPhoneNumber: string;
  statusName: string;
  publicStatusName: string;
  orderDetails: IOrderDetailsInfo[];
  bagsNeed: IBagsNeed[];
  payments: IOrderPayments[];
}
