import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CandleInventoryEntity } from '../../../../database/entities/CandleInventory.entity';
import { ICandleInventoryRepository } from '../../domain/outboundPorts/ICandleInventoryRepository';

@Injectable()
export class CandleInventoryRepository extends Repository<CandleInventoryEntity> implements ICandleInventoryRepository {
  constructor(public readonly dataSource: DataSource) {
    super(CandleInventoryEntity, dataSource.createEntityManager());
  }

  async addQuantityToCandleInventoryByTransaction(
    candleTypeId: number,
    quantity: number,
    transaction: EntityManager,
  ): Promise<CandleInventoryEntity> {
    const findCandleInventory = await transaction.findOne(CandleInventoryEntity, {
      where: { candle_type_id: candleTypeId },
    });
    findCandleInventory.quantity += quantity;
    return transaction.save(findCandleInventory);
  }

  async findCandleInventoryByCandleTypeId(candleTypeId: number): Promise<CandleInventoryEntity> {
    return await this.findOne({ where: { candle_type_id: candleTypeId } });
  }

  async removeQuantityToCandleInventoryByTransaction(
    candleTypeId: number,
    quantity: number,
    transaction: EntityManager,
  ): Promise<CandleInventoryEntity> {
    const findCandleInventory = await transaction.findOne(CandleInventoryEntity, {
      where: { candle_type_id: candleTypeId },
    });
    findCandleInventory.quantity -= quantity;
    return transaction.save(findCandleInventory);
  }

  listCandleInventoryWithNames(whereOptions): Promise<CandleInventoryEntity[]> {
    return this.find({
      relations: {
        candle: true,
      },
      where: { ...whereOptions },
      order: { candle: { name: 'ASC' } },
    });
  }
}
