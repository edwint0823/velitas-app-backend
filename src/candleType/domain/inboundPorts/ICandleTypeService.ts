import { ListCandleTypeDomain } from '../model/out/ListCandleTypeDomain';

export interface ICandleTypeService {
  listCandleTypes(): Promise<ListCandleTypeDomain[]>;
}
