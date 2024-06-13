import { ListAllCandleOptions } from '../model/out/listAllCandleOptions';
import { ListAllOptionsDto } from '../../adapters/model/listAllOptions.dto';
import { CreateCandleOptionDto } from '../../adapters/model/createCandleOption.dto';

export interface ICandleOptionService {
  listAllOptions(pageSize: number, pageNumber: number, query?: ListAllOptionsDto): Promise<ListAllCandleOptions>;

  createOption(file: Express.Multer.File, body: CreateCandleOptionDto): Promise<{ message: string }>;
}
