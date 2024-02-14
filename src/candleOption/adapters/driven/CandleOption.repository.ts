import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CandleTypeEntity } from '../../../../database/entities/CandleType.entity';
import { ICandleOptionRepository } from '../../domain/outboundPorts/ICandleOptionRepository';

@Injectable()
export class CandleOptionRepository
  extends Repository<CandleTypeEntity>
  implements ICandleOptionRepository
{
  constructor(public readonly dataSource: DataSource) {
    super(CandleTypeEntity, dataSource.createEntityManager());
  }

  async listOptions(): Promise<CandleTypeEntity[] | null> {
    return await this.find({
      select: {
        name: true,
        candle_options: {
          id: true,
          name: true,
          url_image: true,
          is_pack: true,
          bulk_price: true,
          retail_price: true,
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
      where: { candle_options: { visible: true } },
    });
  }
}
