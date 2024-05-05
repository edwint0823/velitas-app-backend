import { Injectable } from '@nestjs/common';
import { CandleTypeEntity } from '../../../../database/entities/CandleType.entity';
import { defaultMinimumSizeBulkPrice } from '../../../../core/constants';
import { findParamByNameDomain } from '../../../configuration/domain/model/findParamByNameDomain';
import { CandleOptionAndMinBulkPrice, ICandleListOptions } from '../model/out/getOptionsAndMinItemsBulkPriceDomain';

@Injectable()
export class CandleOptionMapper {
  public static getCandleOptionsAndConfigParamMapper(
    candleTypeEntities: CandleTypeEntity[],
    configData: findParamByNameDomain,
  ): CandleOptionAndMinBulkPrice {
    const configParam = configData.found ? configData.value : defaultMinimumSizeBulkPrice;

    const candleOptions: ICandleListOptions[] = [];
    for (const candleType of candleTypeEntities) {
      candleOptions.push({
        label: candleType.name,
        items: candleType.candle_options.map((candle) => {
          return {
            id: candle.id,
            candleTypeId: candle.candle_type_id,
            name: candle.name,
            urlImage: candle.url_image,
            isPack: candle.is_pack,
            isVipPack: candle.is_vip_pack,
            packNames: candle.pack_names.map((pack) => pack.name),
            bulkPrice: candle.bulk_price,
            retailPrice: candle.retail_price,
          };
        }),
      });
    }
    return {
      minimumSizeBulkPrice: Number(configParam),
      candleListOptions: candleOptions,
    };
  }
}
