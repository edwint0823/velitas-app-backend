import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { IBagInventoryNeedRepository } from '../../domain/outboundPorts/IBagInventoryNeedRepository';
import { BagInventoryNeedEntity } from '../../../../database/entities/BagInventoryNeed.entity';
import { CreateBagInventoryNeedDomain } from '../../domain/model/in/createBagInventoryNeedDomain';

@Injectable()
export class BagInventoryNeedRepository
  extends Repository<BagInventoryNeedEntity>
  implements IBagInventoryNeedRepository
{
  constructor(public readonly dataSource: DataSource) {
    super(BagInventoryNeedEntity, dataSource.createEntityManager());
  }

  async createBagInventoryNeedByTransaction(
    bagInventoryNeedInfo: CreateBagInventoryNeedDomain,
    transaction: EntityManager,
  ): Promise<BagInventoryNeedEntity> {
    const newBagInventoryNeed = new BagInventoryNeedEntity();
    Object.assign(newBagInventoryNeed, bagInventoryNeedInfo);
    return transaction.save(newBagInventoryNeed);
  }

  async getBagInventoryNeedForOrderByOrderCode(orderCode: string): Promise<BagInventoryNeedEntity[]> {
    return await this.find({
      relations: {
        order: true,
      },
      where: {
        order: {
          code: orderCode,
        },
      },
    });
  }
}
