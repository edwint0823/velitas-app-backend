import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BagInventoryMovementEntity } from '../../database/entities/BagInventoryMovement.entity';
import { BagInventoryMovementController } from './adapters/driving/BagInventoryMovement.controller';
import { BagInventoryMovementService } from './domain/inboundPorts/BagInventoryMovement.service';
import { IBagInventoryMovementRepository } from './domain/outboundPorts/IBagInventoryMovementRepository';
import { BagInventoryMovementRepository } from './adapters/driven/BagInventoryMovement.repository';
import { IBagInventoryRepository } from '../bagInventory/domain/outboundPorts/IBagInventoryRepository';
import { BagInventoryRepository } from '../bagInventory/adapters/driven/BagInventory.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BagInventoryMovementEntity])],
  controllers: [BagInventoryMovementController],
  providers: [
    BagInventoryMovementService,
    {
      provide: IBagInventoryMovementRepository,
      useClass: BagInventoryMovementRepository,
    },
    { provide: IBagInventoryRepository, useClass: BagInventoryRepository },
  ],
})
export class BagInventoryMovementModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('bag_inventory_movements');
  }
}
