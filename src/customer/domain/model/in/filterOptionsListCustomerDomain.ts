import { FindOperator } from 'typeorm';

export interface FilterOptionsListCustomerDomain {
  email?: FindOperator<string> | string;
  name?: FindOperator<string> | string;
  phone_number?: FindOperator<string> | string;
  price_type?: FindOperator<string> | string;
}
