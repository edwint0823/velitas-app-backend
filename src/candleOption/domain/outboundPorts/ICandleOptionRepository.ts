import { FiltersToListAllCandleOptionsDomain } from '../model/in/filtersToListAllCandleOptionsDomain';
import { CandleOptionEntity } from '../../../../database/entities/CandleOption.entity';
import { CreateOptionDomain } from '../model/in/createOptionDomain';

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
}

export const ICandleOptionRepository = Symbol('ICandleOptionRepository');
