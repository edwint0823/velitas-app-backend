import { Inject, Injectable } from '@nestjs/common';
import { ICasMovementsService } from './ICasMovementsService';
import { ICashMovementRepository } from '../outboundPorts/ICashMovementRepository';
import { ListCashMovementDto } from '../../adapters/model/listCashMovement.dto';
import { Between, In, MoreThanOrEqual } from 'typeorm';
import { ListCashMovementsDomain } from '../model/out/ListCashMovementsDomain';
import { CashMovementsMapper } from '../mappers/CashMovements.mapper';

@Injectable()
export class CashMovementService implements ICasMovementsService {
  constructor(
    @Inject(ICashMovementRepository)
    private readonly cashMovementRepository: ICashMovementRepository,
  ) {}

  async listAllCashMovements(
    pageSize: number,
    pageNumber: number,
    query?: ListCashMovementDto,
  ): Promise<ListCashMovementsDomain> {
    const whereOptions = {};

    if (query.entry_movement && !query.out_movement) {
      whereOptions['entry_movement'] = true;
    }
    if (!query.entry_movement && query.out_movement) {
      whereOptions['out_movement'] = true;
    }

    if (query.bank_entity) {
      whereOptions['bank_entity_id'] = query.bank_entity;
    }

    if (query.created_at_end) {
      whereOptions['created_at'] = Between(query.created_at_begin, query.created_at_end);
    } else if (query.created_at_begin) {
      whereOptions['created_at'] = MoreThanOrEqual(query.created_at_begin);
    }

    if (query.orders_code) {
      whereOptions['payment'] = {
        order: {
          code: In(query.orders_code),
        },
      };
    }

    const skip = (pageNumber - 1) * pageSize;
    const repositoryResponse = await this.cashMovementRepository.paginateCashMovements(skip, pageSize, whereOptions);
    return CashMovementsMapper.listCashMovementMapper(repositoryResponse);
  }
}
