import { ListBankEntitiesDomain } from '../model/out/ListBankEntitiesDomain';
import { ListAllBankWithAmountDomain } from '../model/out/listAllBankWithAmountDomain';

export interface IBankEntityService {
  listBankEntities(): Promise<ListBankEntitiesDomain[]>;

  allBanksWthAmount(): Promise<ListAllBankWithAmountDomain[]>;
}
