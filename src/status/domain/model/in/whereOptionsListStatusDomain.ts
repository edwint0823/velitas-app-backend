import { FindOperator } from 'typeorm';

interface whereOpts {
  order?: FindOperator<number> | number;
}

export interface WhereOptionsListStatus {
  where?: Array<whereOpts>;
}
