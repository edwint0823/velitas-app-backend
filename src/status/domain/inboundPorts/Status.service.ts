import { Inject, Injectable } from '@nestjs/common';
import { IStatusRepository } from '../outhboundPorts/IStatusRepository';
import { IStatusService } from './IStatusService';
import { maxStatusToCancel } from '../../../../core/constants';
import { MoreThanOrEqual } from 'typeorm';
import { WhereOptionsListStatus } from '../model/in/whereOptionsListStatusDomain';
import { StatusMapper } from '../mappers/Status.mapper';
import { StatusListDomain } from '../model/out/listStatusDomain';

@Injectable()
export class StatusService implements IStatusService {
  constructor(
    @Inject(IStatusRepository)
    private readonly statusRepository: IStatusRepository,
  ) {}

  async statusList(order: number): Promise<StatusListDomain[]> {
    const whereOptions: WhereOptionsListStatus = {
      where: [{ order: MoreThanOrEqual(order) }],
    };
    if (order <= maxStatusToCancel.order) {
      whereOptions.where.push({ order: 0 });
    }
    const repositoryResponse = await this.statusRepository.listStatus(whereOptions);
    return StatusMapper.listStatusMapper(repositoryResponse);
  }
}
