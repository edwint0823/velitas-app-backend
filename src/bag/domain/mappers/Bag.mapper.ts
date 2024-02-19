import { Injectable } from '@nestjs/common';
import { BagEntity } from '../../../../database/entities/Bag.entity';
import { findAllDomain } from '../model/out/findAllDomain';

@Injectable()
export class BagMapper {
  public static listBagsMapper(entities: BagEntity[]): findAllDomain[] {
    return entities.map((entity) => {
      return {
        name: entity.name,
        capacity: entity.capacity,
        id: entity.id,
      };
    });
  }
}
