import { HttpException, Inject, Injectable } from '@nestjs/common';
import { IConfigurationService } from './IConfigurationService';
import { IConfigurationRepository } from '../outboundPorts/IConfigurationRepository';
import { findParamByNameDomain } from '../model/findParamByNameDomain';
import { ConfigurationMapper } from '../mappers/Configuration.mapper';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';

@Injectable()
export class ConfigurationService implements IConfigurationService {
  constructor(
    @Inject(IConfigurationRepository)
    private readonly configurationRepository: IConfigurationRepository,
  ) {}

  async findParamByName(name: string): Promise<findParamByNameDomain> {
    try {
      const repositoryResponse =
        await this.configurationRepository.findParamByName(name);
      return ConfigurationMapper.findParamByNameMapper(repositoryResponse);
    } catch (error) {
      const { message, status } = getErrorParams(
        error,
        'Error al obtener el valor del parámetro seleccionado',
      );
      throw new HttpException({ message }, status);
    }
  }
}
