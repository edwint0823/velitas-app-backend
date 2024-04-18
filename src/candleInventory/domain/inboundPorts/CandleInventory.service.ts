import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ICandleInventoryService } from './ICandleInventoryService';
import { candleInventoryErrorMessages, candleInventorySuccessMessages, IAuthUser } from '../../../../core/constants';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';
import { UpdateCandleInventoryQuantityDto } from '../../adapters/model/updateCandleInventoryQuantity.dto';
import { ICandleInventoryRepository } from '../outboundPorts/ICandleInventoryRepository';
import { ICandleInventoryMovementRepository } from '../../../candleInventoryMovement/domain/outboundPorts/ICandleInventoryMovementRepository';

@Injectable()
export class CandleInventoryService implements ICandleInventoryService {
  constructor(
    @Inject(ICandleInventoryRepository)
    private readonly candleInventoryRepository: ICandleInventoryRepository,
    @Inject(ICandleInventoryMovementRepository)
    private readonly candleInventoryMovementRepository: ICandleInventoryMovementRepository,
  ) {}

  async addOrRemoveCandleInventory(
    candleTypeId: number,
    inventoryInfo: UpdateCandleInventoryQuantityDto,
    user: IAuthUser,
  ): Promise<{
    message: string;
  }> {
    if (!user.is_superuser) {
      throw new HttpException(
        { message: candleInventoryErrorMessages.service.addOrRemoveCandleInventory.unauthorized },
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const findCandleInventory = await this.candleInventoryRepository.findCandleInventoryByCandleTypeId(candleTypeId);
      if (!findCandleInventory) {
        throw new HttpException(
          { message: candleInventoryErrorMessages.service.addOrRemoveCandleInventory.candleNotFound },
          HttpStatus.BAD_REQUEST,
        );
      }
      const payloadToCandleInventoryMovement = {
        candle_type_id: candleTypeId,
        quantity: inventoryInfo.quantity,
        is_entry: inventoryInfo.is_entry,
        is_out: !inventoryInfo.is_entry,
        observation: inventoryInfo.observation,
        created_by: user.id,
      };
      if (inventoryInfo.is_entry) {
        await this.candleInventoryMovementRepository.createEntryCandleInventoryMovement(
          payloadToCandleInventoryMovement,
        );
      } else {
        await this.candleInventoryMovementRepository.createOutCandleInventoryMovement(payloadToCandleInventoryMovement);
      }
      return { message: candleInventorySuccessMessages.service.addOrRemoveCandleInventory.default };
    } catch (error) {
      const { message, status } = getErrorParams(
        error,
        candleInventoryErrorMessages.service.addOrRemoveCandleInventory.default,
      );
      throw new HttpException({ message }, status);
    }
  }
}
