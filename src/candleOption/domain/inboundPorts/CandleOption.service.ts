import { HttpException, Inject, Injectable } from '@nestjs/common';
import { minimumSizeBulkPriceNameParam } from '../../../../core/constants';
import { ICandleOptionService } from './ICandleOptionService';
import { ICandleOptionRepository } from '../outboundPorts/ICandleOptionRepository';
import { IConfigurationService } from '../../../configuration/domain/inboundPorts/IConfigurationService';
import { CandleOptionAndMinBulkPrice } from '../model/out/getOptionsAndMinItemsBulkPriceDomain';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';
import { CandleOptionMapper } from '../mappers/CandleOption.mapper';

@Injectable()
export class CandleOptionService implements ICandleOptionService {
  constructor(
    @Inject(ICandleOptionRepository)
    private readonly candleOptionRepository: ICandleOptionRepository,
    @Inject(IConfigurationService)
    private readonly configurationService: IConfigurationService,
  ) {}

  async getCandleOptionAndMinItemsBulkPrice(): Promise<CandleOptionAndMinBulkPrice> {
    try {
      const candleOptionRepo = await this.candleOptionRepository.listOptions();
      const configService = await this.configurationService.findParamByName(
        minimumSizeBulkPriceNameParam,
      );

      return CandleOptionMapper.getCandleOptionsAndConfigParamMapper(
        candleOptionRepo,
        configService,
      );
    } catch (error) {
      const { message, status } = getErrorParams(
        error,
        'Error al obtener el listado de opciones',
      );
      throw new HttpException(message, status);
    }
  }
}
