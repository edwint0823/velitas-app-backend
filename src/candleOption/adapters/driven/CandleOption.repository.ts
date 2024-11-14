import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ICandleOptionRepository } from '../../domain/outboundPorts/ICandleOptionRepository';
import { CandleOptionEntity } from '../../../../database/entities/CandleOption.entity';
import { FiltersToListAllCandleOptionsDomain } from '../../domain/model/in/filtersToListAllCandleOptionsDomain';

import { CreateOptionDomain } from '../../domain/model/in/createOptionDomain';
import { IPackNameRepository } from '../../../packName/domain/outboundPorts/IPackNameRepository';
import { UpdateCandleOptionDomain } from '../../domain/model/in/updateCandleOptionDomain';

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
      order: { id: 'ASC', name: 'ASC' },
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

  async findCandleOptionById(optionId: number): Promise<CandleOptionEntity> {
    return await this.findOne({ relations: { candle_type: true, pack_names: true }, where: { id: optionId } });
  }

  async updateOption(candleOptionId: number, candleOptionInfo: UpdateCandleOptionDomain): Promise<CandleOptionEntity> {
    return await this.dataSource.transaction(async (entityManager: EntityManager): Promise<CandleOptionEntity> => {
      const candleOptionFind = await entityManager.findOne(CandleOptionEntity, { where: { id: candleOptionId } });
      for (const key in candleOptionInfo) {
        if (key === 'pack_names') continue;

        if (candleOptionInfo[key] !== null) {
          candleOptionFind[key] = candleOptionInfo[key];
        }
      }

      if (candleOptionInfo.pack_names) {
        await this.packNameRepository.deleteAllPackNamesByCandleOptionIdWithTransaction(candleOptionId, entityManager);
        for (const packName of candleOptionInfo.pack_names) {
          await this.packNameRepository.createPackNameByTransaction(packName.name, candleOptionId, entityManager);
        }
      }
      await entityManager.save(candleOptionFind);
      return candleOptionFind;
    });
  }
}
