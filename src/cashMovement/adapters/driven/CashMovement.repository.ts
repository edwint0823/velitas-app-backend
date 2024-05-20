import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CashMovementEntity } from '../../../../database/entities/CashMovement.entity';
import { ICashMovementRepository } from '../../domain/outboundPorts/ICashMovementRepository';
import { createEntryCashMovementDomain } from '../../domain/model/in/createEntryCashMovementDomain';
import { IPaymentRepository } from '../../../payment/domain/outboundPorts/IPaymentRepository';
import { IBankEntityRepository } from '../../../bankEntity/domain/outboundPorts/IBankEntityRepository';
import { ListFilterOptionsDomain } from '../../domain/model/in/listFilterOptionsDomain';
import { CreateOutMovementDomain } from '../../domain/model/in/createOutMovementDomain';

@Injectable()
export class CashMovementRepository extends Repository<CashMovementEntity> implements ICashMovementRepository {
  constructor(
    public readonly dataSource: DataSource,
    @Inject(IPaymentRepository)
    private readonly paymentRepository: IPaymentRepository,
    @Inject(IBankEntityRepository)
    private readonly bankEntityRepository: IBankEntityRepository,
  ) {
    super(CashMovementEntity, dataSource.createEntityManager());
  }

  async createEntryCashMovement(movementInfo: createEntryCashMovementDomain): Promise<CashMovementEntity> {
    return await this.dataSource.transaction(async (entityManager: EntityManager): Promise<CashMovementEntity> => {
      const { payment, ...movement } = movementInfo;
      const newEntryCashMovement = new CashMovementEntity();
      Object.assign(newEntryCashMovement, movement);
      const movementSaved = await entityManager.save(newEntryCashMovement);
      payment.movement_id = movementSaved.id;
      await this.paymentRepository.createPaymentByTransaction(payment, entityManager);
      await this.bankEntityRepository.addAmountToBankByTransaction(
        movementInfo.bank_entity_id,
        movement.amount,
        entityManager,
      );
      return movementSaved;
    });
  }

  async paginateCashMovements(
    skip: number,
    take: number,
    whereOptions: ListFilterOptionsDomain,
  ): Promise<{ movements: CashMovementEntity[]; total: number }> {
    const movements = await this.find({
      relations: {
        bank_entity: true,
        payment: {
          order: true,
        },
      },
      where: { ...whereOptions },
      skip: skip,
      take: take,
      order: { created_at: 'DESC' },
    });

    const total = await this.count({ where: { ...whereOptions } });
    return { movements, total };
  }

  async createOutMovement(movement: CreateOutMovementDomain): Promise<CashMovementEntity> {
    return await this.dataSource.transaction(async (entityManager: EntityManager): Promise<CashMovementEntity> => {
      const newEntryCashMovement = new CashMovementEntity();
      Object.assign(newEntryCashMovement, movement);
      const movementSaved = await entityManager.save(newEntryCashMovement);
      await this.bankEntityRepository.removeAmountToBankByTransaction(
        movement.bank_entity_id,
        movement.amount,
        entityManager,
      );
      return movementSaved;
    });
  }
}
