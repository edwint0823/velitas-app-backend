import { FindOperator } from 'typeorm';

export interface ListAllBagsFilterDomain {
  bag?: {
    available: FindOperator<boolean> | boolean;
    name?: FindOperator<string> | string;
  };
}
