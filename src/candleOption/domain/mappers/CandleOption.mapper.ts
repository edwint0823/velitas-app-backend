import { Injectable } from '@nestjs/common';
import { CandleOptionEntity } from '../../../../database/entities/CandleOption.entity';
import { ListAllCandleOptions } from '../model/out/listAllCandleOptions';

@Injectable()
export class CandleOptionMapper {
  public static listAllOptionsMapper(repositoryResponse: {
    options: CandleOptionEntity[];
    total: number;
  }): ListAllCandleOptions {
    const options = repositoryResponse.options.map((candleOption: CandleOptionEntity) => {
      return {
        id: candleOption.id,
        name: candleOption.name,
        urlImage: candleOption.url_image,
        bulkPrice: candleOption.bulk_price,
        retailPrice: candleOption.retail_price,
        isPack: candleOption.is_pack,
        candleTypeName: candleOption.candle_type.name,
        visible: candleOption.visible,
        isVipPack: candleOption.is_vip_pack,
        packNames: candleOption.pack_names.map((packName) => packName.name),
      };
    });
    return { options, total: repositoryResponse.total };
  }
}
