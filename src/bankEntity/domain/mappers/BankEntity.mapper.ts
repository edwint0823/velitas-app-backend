import { Injectable } from '@nestjs/common';
import { BankEntityEntity } from '../../../../database/entities/BankEntity.entity';
import { ListBankEntitiesDomain } from '../model/out/ListBankEntitiesDomain';
import { ListAllBankWithAmountDomain } from '../model/out/listAllBankWithAmountDomain';

@Injectable()
export class BankEntityMapper {
  public static listBankEntitiesMapper(bankEntities: BankEntityEntity[]): ListBankEntitiesDomain[] {
    return bankEntities.map((bankEntity) => {
      return {
        id: bankEntity.id,
        name: bankEntity.name,
      };
    });
  }

  public static allBanksWithAmountMapper(bankEntities: BankEntityEntity[]): ListAllBankWithAmountDomain[] {
    return bankEntities.map((bankEntity) => {
      return {
        amount: bankEntity.amount,
        name: bankEntity.name,
      };
    });
  }
}
