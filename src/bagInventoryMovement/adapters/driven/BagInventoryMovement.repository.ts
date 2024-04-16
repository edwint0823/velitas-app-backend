import { DataSource, EntityManager, Repository } from 'typeorm';
import { BagInventoryMovementEntity } from '../../../../database/entities/BagInventoryMovement.entity';
import { IBagInventoryMovementRepository } from '../../domain/outboundPorts/IBagInventoryMovementRepository';
import { Inject, Injectable } from '@nestjs/common';
import { CreateEntryInventoryMovementDomain } from '../../domain/model/in/createEntryInventoryMovementDomain';
import { CreateOutInventoryMovementDomain } from '../../domain/model/in/createOutInventoryMovementDomain';
import { IBagInventoryRepository } from '../../../bagInventory/domain/outboundPorts/IBagInventoryRepository';

@Injectable()
export class BagInventoryMovementRepository
  extends Repository<BagInventoryMovementEntity>
  implements IBagInventoryMovementRepository
{
  constructor(
    public readonly datasource: DataSource,
    @Inject(IBagInventoryRepository)
    private readonly bagInventoryRepository: IBagInventoryRepository,
  ) {
    super(BagInventoryMovementEntity, datasource.createEntityManager());
  }

  async createEntryInventoryMovement(
    entryData: CreateEntryInventoryMovementDomain,
  ): Promise<BagInventoryMovementEntity> {
    return await this.datasource.transaction(
      async (entityManager: EntityManager): Promise<BagInventoryMovementEntity> => {
        await this.bagInventoryRepository.addQuantityToBagInventoryByTransaction(
          entryData.bag_id,
          entryData.quantity,
          entityManager,
        );
        const newEntryInventoryMovement = new BagInventoryMovementEntity();
        Object.assign(newEntryInventoryMovement, entryData);
        return await entityManager.save(newEntryInventoryMovement);
      },
    );
  }

  async createOutInventoryMovement(outData: CreateOutInventoryMovementDomain): Promise<BagInventoryMovementEntity> {
    return await this.datasource.transaction(
      async (entityManager: EntityManager): Promise<BagInventoryMovementEntity> => {
        await this.bagInventoryRepository.removeQuantityToBagInventoryByTransaction(
          outData.bag_id,
          outData.quantity,
          entityManager,
        );
        const newOutInventoryMovement = new BagInventoryMovementEntity();
        Object.assign(newOutInventoryMovement, outData);
        return await entityManager.save(newOutInventoryMovement);
      },
    );
  }
}
