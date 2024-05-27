import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CandleInventoryMovementEntity } from '../../database/entities/CandleInventoryMovement.entity';
import { CandleInventoryMovementController } from './adapters/driving/CandleInventoryMovement.controller';
import { CandleInventoryMovementService } from './domain/inboundPorts/CandleInventoryMovement.service';
import { ICandleInventoryMovementRepository } from './domain/outboundPorts/ICandleInventoryMovementRepository';
import { CandleInventoryMovementRepository } from './adapters/driven/CandleInventoryMovement.repository';
import { ICandleInventoryRepository } from '../candleInventory/domain/outboundPorts/ICandleInventoryRepository';
import { CandleInventoryRepository } from '../candleInventory/adapters/driven/CandleInventory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CandleInventoryMovementEntity])],
  controllers: [CandleInventoryMovementController],
  providers: [
    CandleInventoryMovementService,
    { provide: ICandleInventoryMovementRepository, useClass: CandleInventoryMovementRepository },
    { provide: ICandleInventoryRepository, useClass: CandleInventoryRepository },
  ],
})
export class CandleInventoryMovementModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('candle_inventory_movements');
  }
}
