import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { BagInventoryEntity } from '../../../../database/entities/BagInventory.entity';
import { IBagInventoryRepository } from '../../domain/outboundPorts/IBagInventoryRepository';
import { ListAllBagsFilterDomain } from '../../domain/model/in/ListAllBagsFilterDomain';

@Injectable()
export class BagInventoryRepository extends Repository<BagInventoryEntity> implements IBagInventoryRepository {
  constructor(public readonly dataSource: DataSource) {
    super(BagInventoryEntity, dataSource.createEntityManager());
  }

  async addQuantityToBagInventoryByTransaction(
    bagId: number,
    quantity: number,
    transaction: EntityManager,
  ): Promise<BagInventoryEntity> {
    const findBagInventory = await transaction.findOne(BagInventoryEntity, { where: { bag_id: bagId } });
    findBagInventory.quantity += quantity;
    return transaction.save(findBagInventory);
  }

  async removeQuantityToBagInventoryByTransaction(
    bagId: number,
    quantity: number,
    transaction: EntityManager,
  ): Promise<BagInventoryEntity> {
    const findBagInventory = await transaction.findOne(BagInventoryEntity, { where: { bag_id: bagId } });
    findBagInventory.quantity -= quantity;
    return transaction.save(findBagInventory);
  }

  async findBagInventoryByBagId(bagId: number): Promise<BagInventoryEntity> {
    return await this.findOne({ where: { bag_id: bagId } });
  }

  listAvailableBags(whereOptions: ListAllBagsFilterDomain): Promise<BagInventoryEntity[]> {
    return this.find({
      relations: {
        bag: true,
      },
      where: {
        ...whereOptions,
      },
      order: { bag: { name: 'ASC' } },
    });
  }

  getBagWithLowInventory(): Promise<BagInventoryEntity[]> {
    return this.find({
      relations: {
        bag: true,
      },
      take: 1,
      order: { quantity: 'ASC' },
    });
  }
}
