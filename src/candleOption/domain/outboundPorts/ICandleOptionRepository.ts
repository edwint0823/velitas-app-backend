import { FiltersToListAllCandleOptionsDomain } from '../model/in/filtersToListAllCandleOptionsDomain';
import { CandleOptionEntity } from '../../../../database/entities/CandleOption.entity';

export interface ICandleOptionRepository {
  listAllOptions(
    skip: number,
    take: number,
    whereOptions: FiltersToListAllCandleOptionsDomain,
  ): Promise<{
    options: CandleOptionEntity[];
    total: number;
  }>;
}

export const ICandleOptionRepository = Symbol('ICandleOptionRepository');
