import { HttpException, Inject, Injectable } from '@nestjs/common';
import { IConfigurationService } from './IConfigurationService';
import { IConfigurationRepository } from '../outboundPorts/IConfigurationRepository';
import { findParamByNameDomain } from '../model/out/findParamByNameDomain';
import { ConfigurationMapper } from '../mappers/Configuration.mapper';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';
import { configurationErrorMessages, configurationSuccessMessages } from '../../../../core/constants';
import { ListParamsDomain } from '../model/out/listParamsDomain';
import { UpdateParamValueDto } from '../../adapters/models/updateParamValue.dto';

@Injectable()
export class ConfigurationService implements IConfigurationService {
  constructor(
    @Inject(IConfigurationRepository)
    private readonly configurationRepository: IConfigurationRepository,
  ) {}

  async findParamByName(name: string): Promise<findParamByNameDomain> {
    try {
      const repositoryResponse = await this.configurationRepository.findParamByName(name);
      return ConfigurationMapper.findParamByNameMapper(repositoryResponse);
    } catch (error) {
      const { message, status } = getErrorParams(error, configurationErrorMessages.serviceErrors.findByName.default);
      throw new HttpException({ message }, status);
    }
  }

  async listAllParams(): Promise<ListParamsDomain[]> {
    return await this.configurationRepository.listAllParams();
  }

  async updateParamValueById(id: number, body: UpdateParamValueDto): Promise<{ message: string }> {
    try {
      await this.configurationRepository.editValueOfParam(id, body.value);
      return { message: configurationSuccessMessages.service.default };
    } catch (e) {
      const { message, status } = getErrorParams(e, configurationErrorMessages.serviceErrors.updateParamValue.default);
      throw new HttpException({ message }, status);
    }
  }
}
