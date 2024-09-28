import { CreateEntryCandleInventoryMovementDomain } from '../model/in/createEntryCandleInventoryMovementDomain';
import { CandleInventoryMovementEntity } from '../../../../database/entities/CandleInventoryMovement.entity';
import { CreateOutCandleInventoryMovementDomain } from '../model/in/createOutCandleInventoryMovementDomain';
import { EntityManager } from 'typeorm';
import { FiltersListCandleInventoryMovementDomain } from '../model/in/filtersListCandleInventoryMovementDomain';

export interface ICandleInventoryMovementRepository {
  createEntryCandleInventoryMovement(
    entryData: CreateEntryCandleInventoryMovementDomain,
  ): Promise<CandleInventoryMovementEntity>;

  createOutCandleInventoryMovement(
    outData: CreateOutCandleInventoryMovementDomain,
  ): Promise<CandleInventoryMovementEntity>;

  createEntryCandleInventoryMovementByTransaction(
    entryData: CreateEntryCandleInventoryMovementDomain,
    transaction: EntityManager,
  ): Promise<CandleInventoryMovementEntity>;

  createOutCandleInventoryMovementByTransaction(
    outData: CreateOutCandleInventoryMovementDomain,
    transaction: EntityManager,
  ): Promise<CandleInventoryMovementEntity>;

  listCandleInventoryMovements(
    skip: number,
    take: number,
    whereOptions: FiltersListCandleInventoryMovementDomain,
  ): Promise<{
    movements: CandleInventoryMovementEntity[];
    total: number;
  }>;
}

export const ICandleInventoryMovementRepository = Symbol('ICandleInventoryMovementRepository');
