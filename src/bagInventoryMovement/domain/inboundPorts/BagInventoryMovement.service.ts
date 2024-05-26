import { Inject, Injectable } from '@nestjs/common';
import { IBagInventoryMovementRepository } from '../outboundPorts/IBagInventoryMovementRepository';
import { IBagInventoryMovementService } from './IBagInventoryMovementService';
import { ListBagInventoryMovementDto } from '../../adapters/model/ListBagInventoryMovement.dto';
import { ListBagInventoryMovementDomain } from '../model/out/bagInventoryMovementDomain';
import { Between, Like, MoreThanOrEqual } from 'typeorm';
import { BagInventoryMovementMapper } from '../mappers/BagInventoryMovement.mapper';

@Injectable()
export class BagInventoryMovementService implements IBagInventoryMovementService {
  constructor(
    @Inject(IBagInventoryMovementRepository)
    private readonly bagInventoryMovementRepository: IBagInventoryMovementRepository,
  ) {}

  async listBagInventoryMovements(
    pageSize: number,
    pageNumber: number,
    query?: ListBagInventoryMovementDto,
  ): Promise<ListBagInventoryMovementDomain> {
    const whereOptions = {};

    if (query.entry_movement && !query.out_movement) {
      whereOptions['is_entry'] = true;
    }
    if (!query.entry_movement && query.out_movement) {
      whereOptions['is_out'] = true;
    }

    if (query.bag_id) {
      whereOptions['bag_id'] = query.bag_id;
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
    const repositoryResponse = await this.bagInventoryMovementRepository.listAllBagInventoryMovements(
      skip,
      pageSize,
      whereOptions,
    );
    return BagInventoryMovementMapper.listBagInventoryMovementsMapper(repositoryResponse);
  }
}
