import { StatusEntity } from '../../../../database/entities/Status.entity';

export interface IStatusRepository {
  findStatusIdByName(name: string): Promise<StatusEntity | null>;
}

export const IStatusRepository = Symbol('IStatusRepository');
