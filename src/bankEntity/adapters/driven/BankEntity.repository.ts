import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { BankEntityEntity } from '../../../../database/entities/BankEntity.entity';
import { IBankEntityRepository } from '../../domain/outboundPorts/IBankEntityRepository';

@Injectable()
export class BankEntityRepository extends Repository<BankEntityEntity> implements IBankEntityRepository {
  constructor(public readonly dataSource: DataSource) {
    super(BankEntityEntity, dataSource.createEntityManager());
  }

  listBankEntities(): Promise<BankEntityEntity[]> {
    return this.find();
  }
}
