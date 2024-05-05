import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BagInventoryEntity } from '../../database/entities/BagInventory.entity';
import { BagInventoryController } from './adapters/driving/BagInventory.controller';
import { BagInventoryService } from './domain/InboundPorts/BagInventory.service';
import { IBagInventoryRepository } from './domain/outboundPorts/IBagInventoryRepository';
import { BagInventoryRepository } from './adapters/driven/BagInventory.repository';
// eslint-disable-next-line max-len
import { IBagInventoryMovementRepository } from '../bagInventoryMovement/domain/outboundPorts/IBagInventoryMovementRepository';
// eslint-disable-next-line max-len
import { BagInventoryMovementRepository } from '../bagInventoryMovement/adapters/driven/BagInventoryMovement.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BagInventoryEntity])],
  controllers: [BagInventoryController],
  providers: [
    BagInventoryService,
    {
      provide: IBagInventoryRepository,
      useClass: BagInventoryRepository,
    },
    {
      provide: IBagInventoryMovementRepository,
      useClass: BagInventoryMovementRepository,
    },
  ],
})
export class BagInventoryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('bag_inventory');
  }
}
