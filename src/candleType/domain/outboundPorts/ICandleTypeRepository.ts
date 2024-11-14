import { CandleTypeEntity } from '../../../../database/entities/CandleType.entity';

export interface ICandleTypeRepository {
  listCandleType(): Promise<CandleTypeEntity[]>;

  listCandleTypesWithOptions(whereVisible: { candle_options?: { visible?: boolean } }): Promise<CandleTypeEntity[]>;
}

export const ICandleTypeRepository = Symbol('ICandleTypeRepository');
