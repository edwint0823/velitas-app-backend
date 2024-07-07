interface CustomerItem {
  email: string;
  name: string;
  phone_number: string;
  price_type: string;
}

export interface listCustomersDomain {
  customers: CustomerItem[];
  total: number;
}
