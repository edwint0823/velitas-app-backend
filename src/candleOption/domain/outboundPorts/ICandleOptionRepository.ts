import { FiltersToListAllCandleOptionsDomain } from '../model/in/filtersToListAllCandleOptionsDomain';
import { CandleOptionEntity } from '../../../../database/entities/CandleOption.entity';
import { CreateOptionDomain } from '../model/in/createOptionDomain';
import { UpdateCandleOptionDomain } from '../model/in/updateCandleOptionDomain';

export interface ICandleOptionRepository {
  listAllOptions(
    skip: number,
    take: number,
    whereOptions: FiltersToListAllCandleOptionsDomain,
  ): Promise<{
    options: CandleOptionEntity[];
    total: number;
  }>;

  createOption(optionInfo: CreateOptionDomain): Promise<CandleOptionEntity>;

  findCandleOptionById(optionId: number): Promise<CandleOptionEntity>;

  updateOption(candleOptionId: number, candleOptionInfo: UpdateCandleOptionDomain): Promise<CandleOptionEntity>;
}

export const ICandleOptionRepository = Symbol('ICandleOptionRepository');
