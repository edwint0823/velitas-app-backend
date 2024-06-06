import { CandleTypeEntity } from '../../../../database/entities/CandleType.entity';

export interface ICandleTypeRepository {
  listCandleType(): Promise<CandleTypeEntity[]>;

  listCandleTypesWithOptions(): Promise<CandleTypeEntity[]>;
}

export const ICandleTypeRepository = Symbol('ICandleTypeRepository');
