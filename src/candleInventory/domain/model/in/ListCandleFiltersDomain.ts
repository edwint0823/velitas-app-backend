import { FindOperator } from 'typeorm';

export interface ListCandleFiltersDomain {
  candle?: {
    name?: FindOperator<string> | string;
  };
}
