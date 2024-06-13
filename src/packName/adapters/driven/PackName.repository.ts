import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { PackNameEntity } from '../../../../database/entities/PackName.entity';
import { IPackNameRepository } from '../../domain/outboundPorts/IPackNameRepository';

@Injectable()
export class PackNameRepository extends Repository<PackNameEntity> implements IPackNameRepository {
  constructor(public readonly dataSource: DataSource) {
    super(PackNameEntity, dataSource.createEntityManager());
  }

  async createPackNameByTransaction(
    name: string,
    candleOptionId: number,
    transaction: EntityManager,
  ): Promise<PackNameEntity> {
    const packName = new PackNameEntity();
    packName.name = name;
    packName.candle_option_id = candleOptionId;
    return await transaction.save(packName);
  }
}
