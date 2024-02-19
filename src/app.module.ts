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

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DEV_PG_APP_VELITAS_HOST,
      port: parseInt(process.env.DEV_PG_APP_VELITAS_PORT),
      username: process.env.DEV_PG_APP_VELITAS_USERNAME,
      password: process.env.DEV_PG_APP_VELITAS_PASSWORD,
      database: process.env.DEV_PG_APP_VELITAS_DATABASE,
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
