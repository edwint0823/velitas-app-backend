import { ListAllCandleOptions } from '../model/out/listAllCandleOptions';
import { ListAllOptionsDto } from '../../adapters/model/listAllOptions.dto';
import { CreateCandleOptionDto } from '../../adapters/model/createCandleOption.dto';
import { UpdateCandleOptionDto } from '../../adapters/model/updateCandleOption.dto';
import { FindCandleOptionDomain } from '../model/out/findCandleOptionDomain';

export interface ICandleOptionService {
  listAllOptions(pageSize: number, pageNumber: number, query?: ListAllOptionsDto): Promise<ListAllCandleOptions>;

  createOption(file: Express.Multer.File, body: CreateCandleOptionDto): Promise<{ message: string }>;

  updateCandleOption(
    file: Express.Multer.File | undefined,
    body: UpdateCandleOptionDto,
    candle_option_id: string,
  ): Promise<{
    message: string;
  }>;

  findCandleOptionById(id: number): Promise<FindCandleOptionDomain>;
}
