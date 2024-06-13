import { EntityManager } from 'typeorm';
import { PackNameEntity } from '../../../../database/entities/PackName.entity';

export interface IPackNameRepository {
  createPackNameByTransaction(
    name: string,
    candleOptionId: number,
    transaction: EntityManager,
  ): Promise<PackNameEntity>;
}

export const IPackNameRepository = Symbol('IPackNameRepository');
