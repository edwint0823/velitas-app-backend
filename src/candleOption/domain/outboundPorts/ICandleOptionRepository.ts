import { CandleTypeEntity } from '../../../../database/entities/CandleType.entity';

export interface ICandleOptionRepository {
  listOptions(): Promise<CandleTypeEntity[] | null>;
}

export const ICandleOptionRepository = Symbol('ICandleOptionRepository');
