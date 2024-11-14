import { ListCandleTypeDomain } from '../model/out/ListCandleTypeDomain';
import { CandleOptionAndMinBulkPrice } from '../model/out/getOptionsAndMinItemsBulkPriceDomain';
import { IAuthUser } from '../../../../core/constants';

export interface ICandleTypeService {
  listCandleTypes(): Promise<ListCandleTypeDomain[]>;

  getCandleOptionAndMinItemsBulkPrice(user?: IAuthUser): Promise<CandleOptionAndMinBulkPrice>;
}
