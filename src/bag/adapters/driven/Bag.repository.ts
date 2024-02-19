import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IBagRepository } from '../../domain/outboundPorts/IBagRepository';
import { BagEntity } from '../../../../database/entities/Bag.entity';

@Injectable()
export class BagRepository
  extends Repository<BagEntity>
  implements IBagRepository
{
  constructor(public readonly dataSource: DataSource) {
    super(BagEntity, dataSource.createEntityManager());
  }

  async listAllBagsAvailable(): Promise<BagEntity[] | null> {
    return await this.find({
      where: { available: true },
      order: { capacity: 'DESC' },
    });
  }
}
