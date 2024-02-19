import { EntityManager } from 'typeorm';
import { BagInventoryNeedEntity } from '../../../../database/entities/BagInventoryNeed.entity';
import { CreateBagInventoryNeedDomain } from '../model/in/createBagInventoryNeedDomain';

export interface IBagInventoryNeedRepository {
  createBagInventoryNeedByTransaction(
    bagInventoryNeedInfo: CreateBagInventoryNeedDomain,
    transaction: EntityManager,
  ): Promise<BagInventoryNeedEntity>;
}

export const IBagInventoryNeedRepository = Symbol(
  'IBagInventoryNeedRepository',
);
