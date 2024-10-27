interface customerOrderDomain {
  code: string;
  created_at: string;
}

export interface findByEmailDomain {
  found: boolean;
  email: string;
  name: string;
  tel: string;
  priceType: string;
  orders: customerOrderDomain[];
}
