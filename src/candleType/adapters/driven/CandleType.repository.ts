import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CandleTypeEntity } from '../../../../database/entities/CandleType.entity';
import { ICandleTypeRepository } from '../../domain/outboundPorts/ICandleTypeRepository';

@Injectable()
export class CandleTypeRepository extends Repository<CandleTypeEntity> implements ICandleTypeRepository {
  constructor(public readonly dataSource: DataSource) {
    super(CandleTypeEntity, dataSource.createEntityManager());
  }

  async listCandleType(): Promise<CandleTypeEntity[]> {
    return await this.find({
      order: { name: 'ASC' },
    });
  }

  async listCandleTypesWithOptions(whereVisible: {
    candle_options?: { visible?: boolean };
  }): Promise<CandleTypeEntity[]> {
    return await this.find({
      select: {
        name: true,
        candle_options: {
          id: true,
          name: true,
          candle_type_id: true,
          url_image: true,
          is_vip_pack: true,
          is_pack: true,
          bulk_price: true,
          retail_price: true,
          visible: true,
          pack_names: {
            name: true,
          },
        },
      },
      relations: {
        candle_options: {
          pack_names: true,
        },
      },
      where: { ...whereVisible },
    });
  }
}
