import { FindOperator } from 'typeorm';

export interface FilterOptionsForListInventoryDomain {
  name?: FindOperator<string> | string;
}
