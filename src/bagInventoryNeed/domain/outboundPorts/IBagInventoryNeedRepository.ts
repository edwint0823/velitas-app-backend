import { DeleteResult, EntityManager } from 'typeorm';
import { BagInventoryNeedEntity } from '../../../../database/entities/BagInventoryNeed.entity';
import { CreateBagInventoryNeedDomain } from '../model/in/createBagInventoryNeedDomain';

export interface IBagInventoryNeedRepository {
  createBagInventoryNeedByTransaction(
    bagInventoryNeedInfo: CreateBagInventoryNeedDomain,
    transaction: EntityManager,
  ): Promise<BagInventoryNeedEntity>;

  getBagInventoryNeedForOrderByOrderCode(orderCode: string): Promise<BagInventoryNeedEntity[]>;

  deleteBagsInventoryNeedByOrderIdWithTransaction(orderId: number, transaction: EntityManager): Promise<DeleteResult>;
}

export const IBagInventoryNeedRepository = Symbol('IBagInventoryNeedRepository');
