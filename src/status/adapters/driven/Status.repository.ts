import { Injectable } from '@nestjs/common';
import { StatusEntity } from '../../../../database/entities/Status.entity';
import { DataSource, Repository } from 'typeorm';
import { IStatusRepository } from '../../domain/outhboundPorts/IStatusRepository';

@Injectable()
export class StatusRepository
  extends Repository<StatusEntity>
  implements IStatusRepository
{
  constructor(public readonly dataSource: DataSource) {
    super(StatusEntity, dataSource.createEntityManager());
  }

  async findStatusIdByName(name: string): Promise<StatusEntity> {
    return this.findOne({ where: { name: name } });
  }
}
