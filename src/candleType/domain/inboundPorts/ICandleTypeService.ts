import { ListCandleTypeDomain } from '../model/out/ListCandleTypeDomain';
import { CandleOptionAndMinBulkPrice } from '../model/out/getOptionsAndMinItemsBulkPriceDomain';

export interface ICandleTypeService {
  listCandleTypes(): Promise<ListCandleTypeDomain[]>;

  getCandleOptionAndMinItemsBulkPrice(): Promise<CandleOptionAndMinBulkPrice>;
}
