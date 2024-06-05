import { Inject, Injectable } from '@nestjs/common';
import { IOrderStatusService } from './IOrderStatusService';
import { IOrderStatusRepository } from '../outboundPorts/IOrderStatusRepository';
import { ListOrderStatusChangeLogsDto } from '../../adapters/model/ListOrderStatusChangeLogs.dto';
import { ListOrderStatusLogsDomain } from '../model/out/ListOrderStatusLogsDomain';
import { Between, Like, MoreThanOrEqual } from 'typeorm';
import { OrderStatusMapper } from '../mappers/OrderStatusMapper';

@Injectable()
export class OrderStatusService implements IOrderStatusService {
  constructor(
    @Inject(IOrderStatusRepository)
    private readonly orderStatusRepository: IOrderStatusRepository,
  ) {}

  async listOrderStatusChangeLogs(
    pageSize: number,
    pageNumber: number,
    query?: ListOrderStatusChangeLogsDto,
  ): Promise<ListOrderStatusLogsDomain> {
    const whereOptions = {};

    if (query.order_code) {
      whereOptions['order'] = { code: query.order_code };
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
    const repositoryResponse = await this.orderStatusRepository.listOrdersStatusLogChanges(
      skip,
      pageSize,
      whereOptions,
    );
    return OrderStatusMapper.listOrderStatusChangeLogs(repositoryResponse);
  }
}
