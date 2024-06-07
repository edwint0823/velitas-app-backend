import { ListAllCandleOptions } from '../model/out/listAllCandleOptions';
import { ListAllOptionsDto } from '../../adapters/model/listAllOptions.dto';

export interface ICandleOptionService {
  listAllOptions(pageSize: number, pageNumber: number, query?: ListAllOptionsDto): Promise<ListAllCandleOptions>;
}
