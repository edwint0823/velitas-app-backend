import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CandleInventoryMovementEntity } from '../../../../database/entities/CandleInventoryMovement.entity';
import { ICandleInventoryMovementRepository } from '../../domain/outboundPorts/ICandleInventoryMovementRepository';
// eslint-disable-next-line max-len
import { CreateEntryCandleInventoryMovementDomain } from '../../domain/model/in/createEntryCandleInventoryMovementDomain';
import { CreateOutCandleInventoryMovementDomain } from '../../domain/model/in/createOutCandleInventoryMovementDomain';
import { ICandleInventoryRepository } from '../../../candleInventory/domain/outboundPorts/ICandleInventoryRepository';
// eslint-disable-next-line max-len
import { FiltersListCandleInventoryMovementDomain } from '../../domain/model/in/filtersListCandleInventoryMovementDomain';

@Injectable()
export class CandleInventoryMovementRepository
  extends Repository<CandleInventoryMovementEntity>
  implements ICandleInventoryMovementRepository
{
  constructor(
    public readonly dataSource: DataSource,
    @Inject(ICandleInventoryRepository)
    private readonly candleInventoryRepository: ICandleInventoryRepository,
  ) {
    super(CandleInventoryMovementEntity, dataSource.createEntityManager());
  }

  async createEntryCandleInventoryMovement(
    entryData: CreateEntryCandleInventoryMovementDomain,
  ): Promise<CandleInventoryMovementEntity> {
    return await this.dataSource.transaction(
      async (entityManager: EntityManager): Promise<CandleInventoryMovementEntity> => {
        await this.candleInventoryRepository.addQuantityToCandleInventoryByTransaction(
          entryData.candle_type_id,
          entryData.quantity,
          entityManager,
        );
        const newEntryCandleInventoryMovement = new CandleInventoryMovementEntity();
        Object.assign(newEntryCandleInventoryMovement, entryData);
        return await entityManager.save(newEntryCandleInventoryMovement);
      },
    );
  }

  async createOutCandleInventoryMovement(
    outData: CreateOutCandleInventoryMovementDomain,
  ): Promise<CandleInventoryMovementEntity> {
    return await this.dataSource.transaction(
      async (entityManager: EntityManager): Promise<CandleInventoryMovementEntity> => {
        await this.candleInventoryRepository.removeQuantityToCandleInventoryByTransaction(
          outData.candle_type_id,
          outData.quantity,
          entityManager,
        );
        const newOutCandleInventoryMovement = new CandleInventoryMovementEntity();
        Object.assign(newOutCandleInventoryMovement, outData);
        return await entityManager.save(newOutCandleInventoryMovement);
      },
    );
  }

  async createEntryCandleInventoryMovementByTransaction(
    entryData: CreateEntryCandleInventoryMovementDomain,
    transaction: EntityManager,
  ): Promise<CandleInventoryMovementEntity> {
    await this.candleInventoryRepository.addQuantityToCandleInventoryByTransaction(
      entryData.candle_type_id,
      entryData.quantity,
      transaction,
    );
    const newEntryCandleInventoryMovement = new CandleInventoryMovementEntity();
    Object.assign(newEntryCandleInventoryMovement, entryData);
    return await transaction.save(newEntryCandleInventoryMovement);
  }

  async createOutCandleInventoryMovementByTransaction(
    outData: CreateOutCandleInventoryMovementDomain,
    transaction: EntityManager,
  ): Promise<CandleInventoryMovementEntity> {
    await this.candleInventoryRepository.removeQuantityToCandleInventoryByTransaction(
      outData.candle_type_id,
      outData.quantity,
      transaction,
    );
    const newOutCandleInventoryMovement = new CandleInventoryMovementEntity();
    Object.assign(newOutCandleInventoryMovement, outData);
    return await transaction.save(newOutCandleInventoryMovement);
  }

  async listCandleInventoryMovements(
    skip: number,
    take: number,
    whereOptions: FiltersListCandleInventoryMovementDomain,
  ): Promise<{
    movements: CandleInventoryMovementEntity[];
    total: number;
  }> {
    const movements = await this.find({
      relations: {
        candle: true,
      },
      take: take,
      skip: skip,
      where: { ...whereOptions },
      order: { created_at: 'DESC' },
    });

    const total = await this.count({ where: { ...whereOptions } });
    return { movements, total };
  }
}
