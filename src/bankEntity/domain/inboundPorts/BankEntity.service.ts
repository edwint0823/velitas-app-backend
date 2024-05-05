import { Inject, Injectable } from '@nestjs/common';

import { IBankEntityRepository } from '../outboundPorts/IBankEntityRepository';
import { IBankEntityService } from './IBankEntityService';
import { ListBankEntitiesDomain } from '../model/out/ListBankEntitiesDomain';
import { BankEntityMapper } from '../mappers/BankEntity.mapper';

@Injectable()
export class BankEntityService implements IBankEntityService {
  constructor(
    @Inject(IBankEntityRepository)
    private readonly bankEntityRepository: IBankEntityRepository,
  ) {}

  async listBankEntities(): Promise<ListBankEntitiesDomain[]> {
    const repositoryResponse = await this.bankEntityRepository.listBankEntities();
    return BankEntityMapper.listBankEntitiesMapper(repositoryResponse);
  }
}
