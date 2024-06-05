import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandleTypeEntity } from '../../database/entities/CandleType.entity';
import { CandleTypeController } from './adapters/driving/CandleType.controller';
import { CandleTypeService } from './domain/inboundPorts/CandleType.service';
import { ICandleTypeRepository } from './domain/outboundPorts/ICandleTypeRepository';
import { CandleTypeRepository } from './adapters/driven/CandleType.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CandleTypeEntity])],
  controllers: [CandleTypeController],
  providers: [CandleTypeService, { provide: ICandleTypeRepository, useClass: CandleTypeRepository }],
})
export class CandlesTypeModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('candle_type');
  }
}
