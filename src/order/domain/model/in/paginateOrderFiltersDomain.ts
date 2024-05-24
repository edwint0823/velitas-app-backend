import { FindOperator } from 'typeorm';

export interface PaginateOrderFiltersDomain {
  customer?: {
    name?: FindOperator<string> | string;
  };
  code?: FindOperator<string> | string;
  delivery_date?: FindOperator<Date> | Date;
  created_at?: FindOperator<Date> | Date;
}
