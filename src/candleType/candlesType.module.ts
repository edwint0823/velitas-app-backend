import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware, AuthOptionalMiddleware } from '../../middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandleTypeEntity } from '../../database/entities/CandleType.entity';
import { CandleTypeController } from './adapters/driving/CandleType.controller';
import { CandleTypeService } from './domain/inboundPorts/CandleType.service';
import { ICandleTypeRepository } from './domain/outboundPorts/ICandleTypeRepository';
import { CandleTypeRepository } from './adapters/driven/CandleType.repository';
import { IConfigurationService } from '../configuration/domain/inboundPorts/IConfigurationService';
import { ConfigurationService } from '../configuration/domain/inboundPorts/Configuration.service';
import { IConfigurationRepository } from '../configuration/domain/outboundPorts/IConfigurationRepository';
import { ConfigurationRepository } from '../configuration/adapters/driven/Configuration.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CandleTypeEntity])],
  controllers: [CandleTypeController],
  providers: [
    CandleTypeService,
    {
      provide: ICandleTypeRepository,
      useClass: CandleTypeRepository,
    },
    { provide: IConfigurationService, useClass: ConfigurationService },
    { provide: IConfigurationRepository, useClass: ConfigurationRepository },
  ],
})
export class CandlesTypeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('candle_type/list');
    consumer.apply(AuthOptionalMiddleware).forRoutes('candle_type/candle_options_with_min_items');
  }
}
