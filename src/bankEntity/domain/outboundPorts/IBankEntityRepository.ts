import { BankEntityEntity } from '../../../../database/entities/BankEntity.entity';
import { EntityManager } from 'typeorm';

export interface IBankEntityRepository {
  listBankEntities(): Promise<BankEntityEntity[]>;

  addAmountToBankByTransaction(
    bankEntityId: number,
    amount: number,
    transaction: EntityManager,
  ): Promise<BankEntityEntity>;

  removeAmountToBankByTransaction(
    bankEntityId: number,
    amount: number,
    transaction: EntityManager,
  ): Promise<BankEntityEntity>;

  findBankById(bankId: number): Promise<BankEntityEntity>;
}

export const IBankEntityRepository = Symbol.for('IBankEntityRepository');
