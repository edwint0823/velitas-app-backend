import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ICashInventoryService } from './ICashInventoryService';
import { FindCashInventoryByIdDomain } from '../model/out/findCashInventoryByIdDomain';
import { QueryDataListInventoryDto } from '../../adapters/model/queryDataListInventory.dto';
import { ListCashInventoryDomain } from '../model/out/ListCashInventoryDomain';
import { UpdateQuantityToCashInventoryDto } from '../../adapters/model/updateQuantityToCashInventory.dto';
import { ICashInventoryRepository } from '../outboundPorts/ICashInventoryRepository';
import { CashInventoryMapper } from '../mappers/CashInventory.mapper';
import { Like } from 'typeorm';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';
import { cashInventoryErrorMessages, cashInventorySuccessMessages } from '../../../../core/constants';

@Injectable()
export class CashInventoryService implements ICashInventoryService {
  constructor(
    @Inject(ICashInventoryRepository)
    private readonly cashInventoryRepository: ICashInventoryRepository,
  ) {}

  async findCashInventoryById(id: number): Promise<FindCashInventoryByIdDomain> {
    const findCashInventory = await this.cashInventoryRepository.findCashInventoryById(id);
    if (!findCashInventory) {
      throw new HttpException(
        { message: cashInventoryErrorMessages.service.findCashInventory.inventoryItemNotFound },
        HttpStatus.BAD_REQUEST,
      );
    }
    return CashInventoryMapper.findCashInventoryMapper(findCashInventory);
  }

  async listCashInventory(query: QueryDataListInventoryDto): Promise<ListCashInventoryDomain[]> {
    const whereOptions = {};
    if (query.name) {
      whereOptions['name'] = Like(`%${query.name}%`);
    }
    const list = await this.cashInventoryRepository.listInventory(whereOptions);
    return CashInventoryMapper.listCashInventoryMapper(list);
  }

  async updateQuantityToCashInventory(
    id: number,
    body: UpdateQuantityToCashInventoryDto,
  ): Promise<{
    message: string;
  }> {
    try {
      const findCashInventory = await this.cashInventoryRepository.findCashInventoryById(id);
      if (!findCashInventory) {
        throw new HttpException(
          { message: cashInventoryErrorMessages.service.updateQuantity.inventoryItemNotFound },
          HttpStatus.BAD_REQUEST,
        );
      }
      await this.cashInventoryRepository.updateCashInventoryQuantity(id, body.quantity);
      return { message: cashInventorySuccessMessages.service.updateQuantity.default };
    } catch (error) {
      const { message, status } = getErrorParams(error, cashInventoryErrorMessages.service.updateQuantity.default);
      throw new HttpException({ message }, status);
    }
  }
}
