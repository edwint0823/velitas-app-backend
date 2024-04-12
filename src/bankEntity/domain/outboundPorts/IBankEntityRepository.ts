import { BankEntityEntity } from '../../../../database/entities/BankEntity.entity';

export interface IBankEntityRepository {
  listBankEntities(): Promise<BankEntityEntity[]>;
}

export const IBankEntityRepository = Symbol.for('IBankEntityRepository');
