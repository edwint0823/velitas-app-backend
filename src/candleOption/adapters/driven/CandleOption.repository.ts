import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ICandleOptionRepository } from '../../domain/outboundPorts/ICandleOptionRepository';
import { CandleOptionEntity } from '../../../../database/entities/CandleOption.entity';
import { FiltersToListAllCandleOptionsDomain } from '../../domain/model/in/filtersToListAllCandleOptionsDomain';

@Injectable()
export class CandleOptionRepository extends Repository<CandleOptionEntity> implements ICandleOptionRepository {
  constructor(public readonly dataSource: DataSource) {
    super(CandleOptionEntity, dataSource.createEntityManager());
  }

  async listAllOptions(
    skip: number,
    take: number,
    whereOptions: FiltersToListAllCandleOptionsDomain,
  ): Promise<{
    options: CandleOptionEntity[];
    total: number;
  }> {
    const options = await this.find({
      relations: {
        candle_type: true,
        pack_names: true,
      },
      where: whereOptions,
      skip: skip,
      take: take,
      order: { candle_type: { name: 'ASC' } },
    });
    const total = await this.count({ where: whereOptions });
    return { options, total };
  }
}
