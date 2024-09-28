import { FindOperator } from 'typeorm';

export interface FilterOptionsListOrderStatusLogs {
  order?: {
    code?: string;
  };
  created_at?: FindOperator<Date> | Date;
  created_by?: FindOperator<string> | string;
}
