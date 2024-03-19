import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IConfigurationRepository } from '../../domain/outboundPorts/IConfigurationRepository';
import { ConfigurationEntity } from '../../../../database/entities/Configuration.entity';

@Injectable()
export class ConfigurationRepository
  extends Repository<ConfigurationEntity>
  implements IConfigurationRepository
{
  constructor(public readonly dataSource: DataSource) {
    super(ConfigurationEntity, dataSource.createEntityManager());
  }

  async findParamByName(name: string): Promise<ConfigurationEntity | null> {
    return await this.findOne({
      select: { param: true, value: true },
      where: { param: name },
    });
  }
}
