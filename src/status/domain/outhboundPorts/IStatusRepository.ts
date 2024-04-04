import { StatusEntity } from '../../../../database/entities/Status.entity';
import { WhereOptionsListStatus } from '../model/in/whereOptionsListStatusDomain';

export interface IStatusRepository {
  findStatusIdByName(name: string): Promise<StatusEntity | null>;

  listStatus(whereOptions: WhereOptionsListStatus): Promise<StatusEntity[]>;
}

export const IStatusRepository = Symbol('IStatusRepository');
