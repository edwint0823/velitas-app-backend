import { Inject, Injectable } from '@nestjs/common';
import { ICandleOptionService } from './ICandleOptionService';
import { ICandleOptionRepository } from '../outboundPorts/ICandleOptionRepository';

@Injectable()
export class CandleOptionService implements ICandleOptionService {
  constructor(
    @Inject(ICandleOptionRepository)
    private readonly candleOptionRepository: ICandleOptionRepository,
  ) {}
}
