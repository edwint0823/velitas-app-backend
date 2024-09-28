import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ICasMovementsService } from './ICasMovementsService';
import { ICashMovementRepository } from '../outboundPorts/ICashMovementRepository';
import { ListCashMovementDto } from '../../adapters/model/listCashMovement.dto';
import { Between, In, MoreThanOrEqual } from 'typeorm';
import { ListCashMovementsDomain } from '../model/out/ListCashMovementsDomain';
import { CashMovementsMapper } from '../mappers/CashMovements.mapper';
import { CreateOutMovementDto } from '../../adapters/model/createOutMovement.dto';
import { cashMovementsErrorMessages, cashMovementsSuccessMessages, IAuthUser } from '../../../../core/constants';
import { IBankEntityRepository } from '../../../bankEntity/domain/outboundPorts/IBankEntityRepository';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';

@Injectable()
export class CashMovementService implements ICasMovementsService {
  constructor(
    @Inject(ICashMovementRepository)
    private readonly cashMovementRepository: ICashMovementRepository,
    @Inject(IBankEntityRepository)
    private readonly bankEntityRepository: IBankEntityRepository,
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

  async createOutMovement(movementInfo: CreateOutMovementDto, user: IAuthUser): Promise<{ message: string }> {
    const findBank = this.bankEntityRepository.findBankById(movementInfo.bank_entity_id);
    if (!findBank) {
      throw new HttpException(
        { message: cashMovementsErrorMessages.service.createOutMovement },
        HttpStatus.BAD_REQUEST,
      );
    }
    try {
      const payload = {
        amount: movementInfo.amount,
        concept: movementInfo.concept,
        bank_entity_id: movementInfo.bank_entity_id,
        entry_movement: false,
        out_movement: true,
        created_by: JSON.stringify({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        }),
      };
      await this.cashMovementRepository.createOutMovement(payload);
      return { message: cashMovementsSuccessMessages.service.createOutMovement.default };
    } catch (error) {
      const { message, status } = getErrorParams(error, cashMovementsErrorMessages.service.createOutMovement.default);
      throw new HttpException({ message }, status);
    }
  }
}
