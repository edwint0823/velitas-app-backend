import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CandleTypeEntity } from '../../../../database/entities/CandleType.entity';
import { ICandleTypeRepository } from '../../domain/outboundPorts/ICandleTypeRepository';

@Injectable()
export class CandleTypeRepository extends Repository<CandleTypeEntity> implements ICandleTypeRepository {
  constructor(public readonly dataSource: DataSource) {
    super(CandleTypeEntity, dataSource.createEntityManager());
  }

  async listCandleType(): Promise<CandleTypeEntity[]> {
    return await this.find({
      order: { name: 'ASC' },
    });
  }
}
