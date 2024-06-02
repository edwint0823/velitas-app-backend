import { CandleTypeEntity } from '../../../../database/entities/CandleType.entity';

export interface ICandleTypeRepository {
  listCandleType(): Promise<CandleTypeEntity[]>;
}

export const ICandleTypeRepository = Symbol('ICandleTypeRepository');
