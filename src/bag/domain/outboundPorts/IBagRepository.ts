import { BagEntity } from '../../../../database/entities/Bag.entity';

export interface IBagRepository {
  listAllBagsAvailable(): Promise<BagEntity[] | null>;
}

export const IBagRepository = Symbol('IBagRepository');
