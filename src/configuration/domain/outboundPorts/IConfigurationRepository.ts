import { ConfigurationEntity } from '../../../../database/entities/Configuration.entity';

export interface IConfigurationRepository {
  findParamByName(name: string): Promise<ConfigurationEntity | null>;
}

export const IConfigurationRepository = Symbol('IConfigurationRepository');
