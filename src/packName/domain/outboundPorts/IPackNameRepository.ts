import { DeleteResult, EntityManager } from 'typeorm';
import { PackNameEntity } from '../../../../database/entities/PackName.entity';

export interface IPackNameRepository {
  createPackNameByTransaction(
    name: string,
    candleOptionId: number,
    transaction: EntityManager,
  ): Promise<PackNameEntity>;

  deleteAllPackNamesByCandleOptionIdWithTransaction(
    candleOptionId: number,
    transaction: EntityManager,
  ): Promise<DeleteResult>;
}

export const IPackNameRepository = Symbol('IPackNameRepository');
