import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerModule } from './customer/customer.module';
import { CandleOptionModule } from './candleOption/candleOption.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { BagModule } from './bag/bag.module';
import { OrderModule } from './order/order.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerEntity } from '../database/entities/Customer.entity';
import { BagInventoryEntity } from '../database/entities/BagInventory.entity';
import { BagInventoryMovementEntity } from '../database/entities/BagInventoryMovement.entity';
import { BagInventoryNeedEntity } from '../database/entities/BagInventoryNeed.entity';
import { BankEntityEntity } from '../database/entities/BankEntity.entity';
import { CandleInventoryEntity } from '../database/entities/CandleInventory.entity';
import { CandleInventoryMovementEntity } from '../database/entities/CandleInventoryMovement.entity';
import { CandleOptionEntity } from '../database/entities/CandleOption.entity';
import { CandleTypeEntity } from '../database/entities/CandleType.entity';
import { CashMovementEntity } from '../database/entities/CashMovement.entity';
import { ConfigurationEntity } from '../database/entities/Configuration.entity';
import { OrderEntity } from '../database/entities/Order.entity';
import { OrderDetailEntity } from '../database/entities/OrderDetail.entity';
import { PackNameEntity } from '../database/entities/PackName.entity';
import { PaymentEntity } from '../database/entities/Payment.entity';
import { StatusEntity } from '../database/entities/Status.entity';
import { BagEntity } from '../database/entities/Bag.entity';
import { config } from '../database/config-database';

import * as dotenv from 'dotenv';
import { StatusModule } from './status/status.module';
import { OrderStatusChangeLogEntity } from '../database/entities/OrderStatusChangeLogs.entity';
import { PaymentModule } from './payment/payment.module';
import { BankEntityModule } from './bankEntity/bankEntity.module';
import { BagInventoryModule } from './bagInventory/bagInventory.module';
import { CandleInventoryModule } from './candleInventory/candleInventory.module';
import { CashMovementsModule } from './cashMovement/cashMovements.module';
import { CashInventoryEntity } from '../database/entities/CashInventory.entity';
import { CashInventoryModule } from './cashInventory/cashInventory.module';
import { BagInventoryMovementModule } from './bagInventoryMovement/bagInventoryMovement.module';
import { CandleInventoryMovementModule } from './candleInventoryMovement/candleInventoryMovement.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...config[process.env.NODE_ENV],
      entities: [
        CustomerEntity,
        BagEntity,
        BagInventoryEntity,
        BagInventoryMovementEntity,
        BagInventoryNeedEntity,
        BankEntityEntity,
        CandleInventoryEntity,
        CandleInventoryMovementEntity,
        CandleOptionEntity,
        CandleTypeEntity,
        CashMovementEntity,
        ConfigurationEntity,
        OrderEntity,
        OrderDetailEntity,
        PackNameEntity,
        PaymentEntity,
        StatusEntity,
        OrderStatusChangeLogEntity,
        CashInventoryEntity,
      ],
      // ssl: { rejectUnauthorized: false },
      // logging: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 1000,
        limit: 3,
      },
    ]),
    CustomerModule,
    CandleOptionModule,
    ConfigurationModule,
    BagModule,
    OrderModule,
    StatusModule,
    PaymentModule,
    BankEntityModule,
    BagInventoryModule,
    CandleInventoryModule,
    CashMovementsModule,
    CashInventoryModule,
    BagInventoryMovementModule,
    CandleInventoryMovementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
