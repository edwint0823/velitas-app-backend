import { findParamByNameDomain } from '../model/out/findParamByNameDomain';
import { ListParamsDomain } from '../model/out/listParamsDomain';
import { UpdateParamValueDto } from '../../adapters/models/updateParamValue.dto';

export interface IConfigurationService {
  findParamByName(name: string): Promise<findParamByNameDomain>;

  listAllParams(): Promise<ListParamsDomain[]>;

  updateParamValueById(id: number, body: UpdateParamValueDto): Promise<{ message: string }>;
}

export const IConfigurationService = Symbol('IConfigurationService');
