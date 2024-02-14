import { findParamByNameDomain } from '../model/findParamByNameDomain';

export interface IConfigurationService {
  findParamByName(name: string): Promise<findParamByNameDomain>;
}

export const IConfigurationService = Symbol('IConfigurationService');
