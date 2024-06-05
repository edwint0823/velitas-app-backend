import { CandleTypeEntity } from '../../../../database/entities/CandleType.entity';
import { ListCandleTypeDomain } from '../model/out/ListCandleTypeDomain';

export class CandleTypeMapper {
  public static listCandleTypeMapper(candleTypes: CandleTypeEntity[]): ListCandleTypeDomain[] {
    return candleTypes.map((candleType) => {
      return {
        id: candleType.id,
        name: candleType.name,
      };
    });
  }
}
