import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CashInventoryEntity } from '../../../../database/entities/CashInventory.entity';
import { ICashInventoryRepository } from '../../domain/outboundPorts/ICashInventoryRepository';
import { FilterOptionsForListInventoryDomain } from '../../domain/model/in/FilterOptionsForListInventoryDomain';

@Injectable()
export class CashInventoryRepository extends Repository<CashInventoryEntity> implements ICashInventoryRepository {
  constructor(public readonly dataSource: DataSource) {
    super(CashInventoryEntity, dataSource.createEntityManager());
  }

  async listInventory(whereOptions: FilterOptionsForListInventoryDomain): Promise<CashInventoryEntity[]> {
    return await this.find({
      where: { ...whereOptions },
      order: { quantity: 'DESC' },
    });
  }

  async findCashInventoryById(id: number): Promise<CashInventoryEntity> {
    return await this.findOne({ where: { id: id } });
  }

  async updateCashInventoryQuantity(id: number, quantity: number): Promise<CashInventoryEntity> {
    const cashInventoryFind = await this.findOne({ where: { id: id } });
    cashInventoryFind.quantity = quantity;
    return await this.save(cashInventoryFind);
  }
}
