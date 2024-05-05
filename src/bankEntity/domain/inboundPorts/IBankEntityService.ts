import { ListBankEntitiesDomain } from '../model/out/ListBankEntitiesDomain';

export interface IBankEntityService {
  listBankEntities(): Promise<ListBankEntitiesDomain[]>;
}
