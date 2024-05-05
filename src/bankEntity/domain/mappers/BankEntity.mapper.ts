import { Injectable } from '@nestjs/common';
import { BankEntityEntity } from '../../../../database/entities/BankEntity.entity';
import { ListBankEntitiesDomain } from '../model/out/ListBankEntitiesDomain';

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
}
