import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandleInventoryEntity } from '../../database/entities/CandleInventory.entity';
import { CandleInventoryController } from './adapters/driving/CandleInventory.controller';
import { CandleInventoryService } from './domain/inboundPorts/CandleInventory.service';
import { ICandleInventoryRepository } from './domain/outboundPorts/ICandleInventoryRepository';
import { CandleInventoryRepository } from './adapters/driven/CandleInventory.repository';
// eslint-disable-next-line max-len
import { ICandleInventoryMovementRepository } from '../candleInventoryMovement/domain/outboundPorts/ICandleInventoryMovementRepository';
// eslint-disable-next-line max-len
import { CandleInventoryMovementRepository } from '../candleInventoryMovement/adapters/driven/CandleInventoryMovement.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CandleInventoryEntity])],
  controllers: [CandleInventoryController],
  providers: [
    CandleInventoryService,
    { provide: ICandleInventoryRepository, useClass: CandleInventoryRepository },
    { provide: ICandleInventoryMovementRepository, useClass: CandleInventoryMovementRepository },
  ],
})
export class CandleInventoryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('candle_inventory');
  }
}
