import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ICandleOptionRepository } from '../../domain/outboundPorts/ICandleOptionRepository';
import { CandleOptionEntity } from '../../../../database/entities/CandleOption.entity';

@Injectable()
export class CandleOptionRepository extends Repository<CandleOptionEntity> implements ICandleOptionRepository {
  constructor(public readonly dataSource: DataSource) {
    super(CandleOptionEntity, dataSource.createEntityManager());
  }
}
