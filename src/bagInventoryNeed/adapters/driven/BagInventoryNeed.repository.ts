import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { IBagInventoryNeedRepository } from '../../domain/outboundPorts/IBagInventoryNeedRepository';
import { BagInventoryNeedEntity } from '../../../../database/entities/BagInventoryNeed.entity';
import { CreateBagInventoryNeedDomain } from '../../domain/model/in/createBagInventoryNeedDomain';

@Injectable()
export class BagInventoryNeedRepository
  extends Repository<BagInventoryNeedEntity>
  implements IBagInventoryNeedRepository
{
  async createBagInventoryNeedByTransaction(
    bagInventoryNeedInfo: CreateBagInventoryNeedDomain,
    transaction: EntityManager,
  ): Promise<BagInventoryNeedEntity> {
    const newBagInventoryNeed = new BagInventoryNeedEntity();
    Object.assign(newBagInventoryNeed, bagInventoryNeedInfo);
    return transaction.save(newBagInventoryNeed);
  }
}
