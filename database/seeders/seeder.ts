import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { config } from '../config-database';
import { BankEntityEntity } from '../entities/BankEntity.entity';
import { CandleOptionEntity } from '../entities/CandleOption.entity';
import { CandleTypeEntity } from '../entities/CandleType.entity';
import { ConfigurationEntity } from '../entities/Configuration.entity';
import { PackNameEntity } from '../entities/PackName.entity';
import { StatusEntity } from '../entities/Status.entity';
import { OrderEntity } from '../entities/Order.entity';
import { CustomerEntity } from '../entities/Customer.entity';
import { OrderDetailEntity } from '../entities/OrderDetail.entity';
import { BagEntity } from '../entities/Bag.entity';
import { BagInventoryEntity } from '../entities/BagInventory.entity';
import { CashMovementEntity } from '../entities/CashMovement.entity';
import { CandleInventoryEntity } from '../entities/CandleInventory.entity';
import { BagInventoryMovementEntity } from '../entities/BagInventoryMovement.entity';
import { BagInventoryNeedEntity } from '../entities/BagInventoryNeed.entity';
import { CandleInventoryMovementEntity } from '../entities/CandleInventoryMovement.entity';
import { PaymentEntity } from '../entities/Payment.entity';
import { OrderStatusChangeLogEntity } from '../entities/OrderStatusChangeLogs.entity';
import { CashInventoryEntity } from '../entities/CashInventory.entity';

dotenv.config();

async function seed() {
  try {
    const connection = new DataSource({
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
    });
    await connection.initialize();

    const statusJson = fs.readFileSync(path.join(__dirname, '../../src/seedersData/status-seed.json'), 'utf8');
    const bankEntitiesJson = fs.readFileSync(
      path.join(__dirname, '../../src/seedersData/bankEntities-seed.json'),
      'utf8',
    );
    const configurationJson = fs.readFileSync(
      path.join(__dirname, '../../src/seedersData/configurations-seed.json'),
      'utf8',
    );
    const candlesJson = fs.readFileSync(path.join(__dirname, '../../src/seedersData/candles-seed.json'), 'utf8');
    const bagsJson = fs.readFileSync(path.join(__dirname, '../../src/seedersData/bags-seed.json'), 'utf8');
    const cashInventoryJson = fs.readFileSync(
      path.join(__dirname, '../../src/seedersData/cashInventory-seed.json'),
      'utf8',
    );

    const statusData = JSON.parse(statusJson);
    const bankEntitiesData = JSON.parse(bankEntitiesJson);
    const configurationData = JSON.parse(configurationJson);
    const candlesData = JSON.parse(candlesJson);
    const bagsData = JSON.parse(bagsJson);
    const cashInventoryData = JSON.parse(cashInventoryJson);

    await connection.transaction(async (manager) => {
      /* STATUS SEED */
      for (const status of statusData) {
        const findStatus = await manager.getRepository(StatusEntity).findOne({ where: { name: status.name } });
        if (findStatus === null) {
          await manager.getRepository(StatusEntity).save(status);
        }
      }

      /* BANK ENTITIES SEED */
      for (const bank of bankEntitiesData) {
        const findBank = await manager.getRepository(BankEntityEntity).findOne({ where: { name: bank.name } });
        if (findBank === null) {
          await manager.getRepository(BankEntityEntity).save(bank);
        }
      }

      /* CONFIGURATION PARAMS SEED */
      for (const configParam of configurationData) {
        const findConfigParam = await manager
          .getRepository(ConfigurationEntity)
          .findOne({ where: { param: configParam.param } });
        if (findConfigParam === null) {
          await manager.getRepository(ConfigurationEntity).save(configParam);
        }
      }

      /* CANDLE TYPE SEED */
      for (const candle of candlesData) {
        let candleType = await manager.getRepository(CandleTypeEntity).findOne({ where: { name: candle.name } });
        if (candleType === null) {
          candleType = await manager.getRepository(CandleTypeEntity).save(candle);

          /* CANDLE INVENTORY SEED */
          candle.candle_inventory.candle_type_id = candleType.id;
          await manager.getRepository(CandleInventoryEntity).save(candle.candle_inventory);
        }

        /* CANDLE OPTIONS SEED */
        for (const candleOption of candle.candle_options) {
          candleOption.candle_type_id = candleType.id;

          let candleOptionSaved = await manager.getRepository(CandleOptionEntity).findOne({
            where: { name: candleOption.name },
          });

          if (candleOptionSaved === null) {
            candleOptionSaved = await manager.getRepository(CandleOptionEntity).save(candleOption);

            /* PACK NAMES SEED */
            if (candleOption.is_pack && candleOption.pack_names.length > 0) {
              for (const packName of candleOption.pack_names) {
                packName.candle_option_id = candleOptionSaved.id;
                await manager.getRepository(PackNameEntity).save(packName);
              }
            }
          }
        }
      }

      /* BAGS SEED */
      for (const bagData of bagsData) {
        const { bag_inventory, ...bag } = bagData;
        let findBag = await manager.getRepository(BagEntity).findOne({ where: { name: bag.name } });
        if (findBag === null) {
          findBag = await manager.getRepository(BagEntity).save(bag);
          /* BAG INGENTORY SEED */
          bag_inventory.bag_id = findBag.id;
          await manager.getRepository(BagInventoryEntity).save(bag_inventory);
        }
      }

      /* CASH INVENTORY SEED*/
      for (const cashInventory of cashInventoryData) {
        const findCashInventory = await manager
          .getRepository(CashInventoryEntity)
          .findOne({ where: { name: cashInventory.name } });
        if (findCashInventory === null) {
          await manager.getRepository(CashInventoryEntity).save(cashInventory);
        }
      }
    });

    await connection.close();
    console.log('Se ejecutaron los seeders correctamente');
  } catch (error) {
    console.error('Error al ejecutar el seeder:', error);
  }
}

seed();
