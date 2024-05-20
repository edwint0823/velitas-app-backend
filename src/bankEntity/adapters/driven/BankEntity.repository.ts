import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { BankEntityEntity } from '../../../../database/entities/BankEntity.entity';
import { IBankEntityRepository } from '../../domain/outboundPorts/IBankEntityRepository';

@Injectable()
export class BankEntityRepository extends Repository<BankEntityEntity> implements IBankEntityRepository {
  constructor(public readonly dataSource: DataSource) {
    super(BankEntityEntity, dataSource.createEntityManager());
  }

  listBankEntities(): Promise<BankEntityEntity[]> {
    return this.find({ order: { name: 'ASC' } });
  }

  async addAmountToBankByTransaction(
    bankEntityId: number,
    amount: number,
    transaction: EntityManager,
  ): Promise<BankEntityEntity> {
    const bankEntityFind = await transaction.findOne(BankEntityEntity, { where: { id: bankEntityId } });
    bankEntityFind.amount += amount;
    return transaction.save(bankEntityFind);
  }

  async removeAmountToBankByTransaction(
    bankEntityId: number,
    amount: number,
    transaction: EntityManager,
  ): Promise<BankEntityEntity> {
    const bankEntityFind = await transaction.findOne(BankEntityEntity, { where: { id: bankEntityId } });
    bankEntityFind.amount -= amount;
    return transaction.save(bankEntityFind);
  }

  findBankById(bankId: number): Promise<BankEntityEntity> {
    return this.findOne({ where: { id: bankId } });
  }
}
