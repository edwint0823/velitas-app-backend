import { Injectable } from '@nestjs/common';
import { StatusEntity } from '../../../../database/entities/Status.entity';
import { DataSource, Repository } from 'typeorm';
import { IStatusRepository } from '../../domain/outboundPorts/IStatusRepository';
import { WhereOptionsListStatus } from '../../domain/model/in/whereOptionsListStatusDomain';

@Injectable()
export class StatusRepository extends Repository<StatusEntity> implements IStatusRepository {
  constructor(public readonly dataSource: DataSource) {
    super(StatusEntity, dataSource.createEntityManager());
  }

  async findStatusIdByName(name: string): Promise<StatusEntity> {
    return this.findOne({ where: { name: name } });
  }

  async listStatus(whereOptions: WhereOptionsListStatus): Promise<StatusEntity[]> {
    return this.find({
      ...whereOptions,
      order: { order: 'ASC' },
    });
  }

  async findStatusById(id: number): Promise<StatusEntity | null> {
    return await this.findOne({ where: { id: id } });
  }
}
