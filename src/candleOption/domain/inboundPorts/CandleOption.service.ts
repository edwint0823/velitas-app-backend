import { Inject, Injectable } from '@nestjs/common';
import { ICandleOptionService } from './ICandleOptionService';
import { ICandleOptionRepository } from '../outboundPorts/ICandleOptionRepository';
import { ListAllOptionsDto } from '../../adapters/model/listAllOptions.dto';
import { ListAllCandleOptions } from '../model/out/listAllCandleOptions';
import { CandleOptionMapper } from '../mappers/CandleOption.mapper';

@Injectable()
export class CandleOptionService implements ICandleOptionService {
  constructor(
    @Inject(ICandleOptionRepository)
    private readonly candleOptionRepository: ICandleOptionRepository,
  ) {}

  async listAllOptions(pageSize: number, pageNumber: number, query?: ListAllOptionsDto): Promise<ListAllCandleOptions> {
    const whereOptions = {};
    if (query.is_pack) {
      whereOptions['is_pack'] = query.is_pack;
    }
    if (query.candle_type_id) {
      whereOptions['candle_type_id'] = query.candle_type_id;
    }
    if (query.visible) {
      whereOptions['visible'] = query.visible;
    }
    if (query.is_vip_pack) {
      whereOptions['is_vip_pack'] = query.is_vip_pack;
    }
    const skip = (pageNumber - 1) * pageSize;
    const repositoryResponse = await this.candleOptionRepository.listAllOptions(skip, pageSize, whereOptions);
    return CandleOptionMapper.listAllOptionsMapper(repositoryResponse);
  }
}
