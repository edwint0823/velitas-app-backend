import { Inject, Injectable } from '@nestjs/common';
import { ICandleTypeService } from './ICandleTypeService';
import { ICandleTypeRepository } from '../outboundPorts/ICandleTypeRepository';
import { ListCandleTypeDomain } from '../model/out/ListCandleTypeDomain';
import { CandleTypeMapper } from '../mappers/CandleType.mapper';

@Injectable()
export class CandleTypeService implements ICandleTypeService {
  constructor(
    @Inject(ICandleTypeRepository)
    private readonly candleTypeRepository: ICandleTypeRepository,
  ) {}

  async listCandleTypes(): Promise<ListCandleTypeDomain[]> {
    const candleTypes = await this.candleTypeRepository.listCandleType();
    return CandleTypeMapper.listCandleTypeMapper(candleTypes);
  }
}
