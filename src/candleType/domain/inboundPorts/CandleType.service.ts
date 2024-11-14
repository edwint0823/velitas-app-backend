import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ICandleTypeService } from './ICandleTypeService';
import { ICandleTypeRepository } from '../outboundPorts/ICandleTypeRepository';
import { ListCandleTypeDomain } from '../model/out/ListCandleTypeDomain';
import { CandleTypeMapper } from '../mappers/CandleType.mapper';
import { CandleOptionAndMinBulkPrice } from '../model/out/getOptionsAndMinItemsBulkPriceDomain';
import { candleTypeErrorMessages, IAuthUser, minimumSizeBulkPriceNameParam } from '../../../../core/constants';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';
import { IConfigurationService } from '../../../configuration/domain/inboundPorts/IConfigurationService';

@Injectable()
export class CandleTypeService implements ICandleTypeService {
  constructor(
    @Inject(ICandleTypeRepository)
    private readonly candleTypeRepository: ICandleTypeRepository,
    @Inject(IConfigurationService)
    private readonly configurationService: IConfigurationService,
  ) {}

  async listCandleTypes(): Promise<ListCandleTypeDomain[]> {
    const candleTypes = await this.candleTypeRepository.listCandleType();
    return CandleTypeMapper.listCandleTypeMapper(candleTypes);
  }

  async getCandleOptionAndMinItemsBulkPrice(user?: IAuthUser): Promise<CandleOptionAndMinBulkPrice> {
    try {
      let whereVisible = {};
      if (user === undefined || (user && !user.is_superuser)) {
        whereVisible = { candle_options: { visible: true } };
      }
      const candleOptionRepo = await this.candleTypeRepository.listCandleTypesWithOptions(whereVisible);
      const configService = await this.configurationService.findParamByName(minimumSizeBulkPriceNameParam);
      return CandleTypeMapper.getCandleTypesWithOptionsAndConfigParamMapper(candleOptionRepo, configService);
    } catch (error) {
      const { message, status } = getErrorParams(
        error,
        candleTypeErrorMessages.service.listTypesWithOptionsOperations.default,
      );
      throw new HttpException({ message }, status);
    }
  }
}
