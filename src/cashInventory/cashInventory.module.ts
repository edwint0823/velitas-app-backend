import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CashInventoryEntity } from '../../database/entities/CashInventory.entity';
import { CashInventoryController } from './adapters/driving/CashInventory.controller';
import { CashInventoryService } from './domain/inboundPorts/CashInventory.service';
import { ICashInventoryRepository } from './domain/outboundPorts/ICashInventoryRepository';
import { CashInventoryRepository } from './adapters/driven/CashInventory.repository';
import { AuthMiddleware } from '../../middlewares/auth.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([CashInventoryEntity])],
  controllers: [CashInventoryController],
  providers: [
    CashInventoryService,
    {
      provide: ICashInventoryRepository,
      useClass: CashInventoryRepository,
    },
  ],
})
export class CashInventoryModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('cash_inventory');
  }
}
