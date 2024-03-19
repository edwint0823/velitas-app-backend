import { CandleOptionAndMinBulkPrice } from '../model/out/getOptionsAndMinItemsBulkPriceDomain';

export interface ICandleOptionService {
  getCandleOptionAndMinItemsBulkPrice(): Promise<CandleOptionAndMinBulkPrice>;
}
