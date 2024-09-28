import { FindOperator } from 'typeorm';

export interface ListFilterOptionsDomain {
  entry_movement?: boolean;
  out_movement?: boolean;
  bank_entity_id?: number;
  created_at?: FindOperator<Date> | Date;
  payment?: {
    order?: {
      code?: FindOperator<string> | string;
    };
  };
}
