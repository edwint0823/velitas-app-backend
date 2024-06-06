import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandleTypeEntity } from '../../database/entities/CandleType.entity';
import { CandleOptionEntity } from '../../database/entities/CandleOption.entity';
import { PackNameEntity } from '../../database/entities/PackName.entity';
import { CandleOptionController } from './adapters/driving/CandleOption.controller';
import { CandleOptionService } from './domain/inboundPorts/CandleOption.service';
import { ICandleOptionRepository } from './domain/outboundPorts/ICandleOptionRepository';
import { CandleOptionRepository } from './adapters/driven/CandleOption.repository';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([CandleTypeEntity, CandleOptionEntity, PackNameEntity])],
  controllers: [CandleOptionController],
  providers: [CandleOptionService, { provide: ICandleOptionRepository, useClass: CandleOptionRepository }],
})
export class CandleOptionModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('candle_options');
  }
}
