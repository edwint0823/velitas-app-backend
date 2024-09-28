import { ConfigurationEntity } from '../../../../database/entities/Configuration.entity';

export interface IConfigurationRepository {
  findParamByName(name: string): Promise<ConfigurationEntity | null>;

  listAllParams(): Promise<ConfigurationEntity[]>;

  editValueOfParam(id: number, value: string): Promise<ConfigurationEntity>;
}

export const IConfigurationRepository = Symbol('IConfigurationRepository');
