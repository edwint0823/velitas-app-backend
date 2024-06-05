import { FindOperator } from 'typeorm';

export interface FiltersListCandleInventoryMovementDomain {
  is_entry?: boolean;
  is_out?: boolean;
  candle_type_id?: number;
  created_at?: FindOperator<Date> | Date;
  created_by?: FindOperator<string> | string;
}
