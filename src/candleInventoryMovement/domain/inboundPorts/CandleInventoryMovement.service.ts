import { Inject, Injectable } from '@nestjs/common';
import { ICandleInventoryMovementService } from './ICandleInventoryMovementService';
import { ICandleInventoryMovementRepository } from '../outboundPorts/ICandleInventoryMovementRepository';
import { ListCandleInventoryMovementDto } from '../../adapters/model/ListCandleInventoryMovement.dto';
import { CandleInventoryMovementDomain } from '../model/out/candleInventoryMovementDomain';
import { Between, Like, MoreThanOrEqual } from 'typeorm';
import { CandleInventoryMovementMapper } from '../mappers/CandleInventoryMovement.mapper';

@Injectable()
export class CandleInventoryMovementService implements ICandleInventoryMovementService {
  constructor(
    @Inject(ICandleInventoryMovementRepository)
    private readonly candleInventoryMovementRepository: ICandleInventoryMovementRepository,
  ) {}

  async listCandleInventoryMovements(
    pageSize: number,
    pageNumber: number,
    query?: ListCandleInventoryMovementDto,
  ): Promise<CandleInventoryMovementDomain> {
    const whereOptions = {};

    if (query.entry_movement && !query.out_movement) {
      whereOptions['is_entry'] = true;
    }
    if (!query.entry_movement && query.out_movement) {
      whereOptions['is_out'] = true;
    }
    if (query.candle_type_id) {
      whereOptions['candle_type_id'] = query.candle_type_id;
    }
    if (query.created_at_end) {
      whereOptions['created_at'] = Between(query.created_at_begin, query.created_at_end);
    } else if (query.created_at_begin) {
      whereOptions['created_at'] = MoreThanOrEqual(query.created_at_begin);
    }
    if (query.created_by_name) {
      whereOptions['created_by'] = Like(`%${query.created_by_name}%`);
    }

    const skip = (pageNumber - 1) * pageSize;
    const repositoryResponse = await this.candleInventoryMovementRepository.listCandleInventoryMovements(
      skip,
      pageSize,
      whereOptions,
    );
    return CandleInventoryMovementMapper.listCandleInventoryMovementsMapper(repositoryResponse);
  }
}
