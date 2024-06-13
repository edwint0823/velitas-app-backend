import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ICandleOptionRepository } from '../../domain/outboundPorts/ICandleOptionRepository';
import { CandleOptionEntity } from '../../../../database/entities/CandleOption.entity';
import { FiltersToListAllCandleOptionsDomain } from '../../domain/model/in/filtersToListAllCandleOptionsDomain';

import { CreateOptionDomain } from '../../domain/model/in/createOptionDomain';
import { IPackNameRepository } from '../../../packName/domain/outboundPorts/IPackNameRepository';

@Injectable()
export class CandleOptionRepository extends Repository<CandleOptionEntity> implements ICandleOptionRepository {
  constructor(
    public readonly dataSource: DataSource,
    @Inject(IPackNameRepository)
    private readonly packNameRepository: IPackNameRepository,
  ) {
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

  async createOption(optionInfo: CreateOptionDomain): Promise<CandleOptionEntity> {
    return await this.dataSource.transaction(async (entityManager: EntityManager): Promise<CandleOptionEntity> => {
      const newCandleOption = new CandleOptionEntity();
      newCandleOption.name = optionInfo.name;
      newCandleOption.url_image = optionInfo.url_image;
      newCandleOption.bulk_price = optionInfo.bulk_price;
      newCandleOption.retail_price = optionInfo.retail_price;
      newCandleOption.is_pack = optionInfo.is_pack;
      newCandleOption.candle_type_id = optionInfo.candle_type_id;
      newCandleOption.visible = optionInfo.visible;
      newCandleOption.is_vip_pack = optionInfo.is_vip_pack;
      const candleOptionSaved = await entityManager.save(newCandleOption);

      if (optionInfo.is_pack) {
        for (const packName of optionInfo.pack_names) {
          await this.packNameRepository.createPackNameByTransaction(packName.name, candleOptionSaved.id, entityManager);
        }
      }
      return candleOptionSaved;
    });
  }
}
