import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandleTypeEntity } from '../../database/entities/CandleType.entity';
import { CandleOptionEntity } from '../../database/entities/CandleOption.entity';
import { PackNameEntity } from '../../database/entities/PackName.entity';
import { CandleOptionController } from './adapters/driving/CandleOption.controller';
import { CandleOptionService } from './domain/inboundPorts/CandleOption.service';
import { ICandleOptionRepository } from './domain/outboundPorts/ICandleOptionRepository';
import { CandleOptionRepository } from './adapters/driven/CandleOption.repository';
import { IConfigurationRepository } from '../configuration/domain/outboundPorts/IConfigurationRepository';
import { ConfigurationRepository } from '../configuration/adapters/driven/Configuration.repository';
import { IConfigurationService } from '../configuration/domain/inboundPorts/IConfigurationService';
import { ConfigurationService } from '../configuration/domain/inboundPorts/Configuration.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CandleTypeEntity,
      CandleOptionEntity,
      PackNameEntity,
    ]),
  ],
  controllers: [CandleOptionController],
  providers: [
    CandleOptionService,
    { provide: ICandleOptionRepository, useClass: CandleOptionRepository },
    { provide: IConfigurationService, useClass: ConfigurationService },
    { provide: IConfigurationRepository, useClass: ConfigurationRepository },
  ],
})
export class CandleOptionModule {}
