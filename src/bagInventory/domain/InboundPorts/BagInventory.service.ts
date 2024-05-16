import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IBagInventoryService } from './IBagInventoryService';
import { UpdateInventoryQuantityDto } from '../../adapters/model/updateInventoryQuantity.dto';
import { bagInventoryErrorMessages, bagInventorySuccessMessages, IAuthUser } from '../../../../core/constants';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';
import { IBagInventoryRepository } from '../outboundPorts/IBagInventoryRepository';
// eslint-disable-next-line max-len
import { IBagInventoryMovementRepository } from '../../../bagInventoryMovement/domain/outboundPorts/IBagInventoryMovementRepository';
import { listBagInventoryDto } from '../../adapters/model/listBagInventory.dto';
import { ListBagInventoryDomain } from '../model/out/listBagInventoryDomain';
import { Equal, Like } from 'typeorm';
import { BagInventoryMapper } from '../mappers/BagInventory.mapper';

@Injectable()
export class BagInventoryService implements IBagInventoryService {
  constructor(
    @Inject(IBagInventoryRepository)
    private readonly bagInventoryRepository: IBagInventoryRepository,
    @Inject(IBagInventoryMovementRepository)
    private readonly bagInventoryMovementRepository: IBagInventoryMovementRepository,
  ) {}

  async addOrRemoveBagInventory(
    bagId: number,
    inventoryInfo: UpdateInventoryQuantityDto,
    user: IAuthUser,
  ): Promise<{
    message: string;
  }> {
    if (!user.is_superuser) {
      throw new HttpException(
        { message: bagInventoryErrorMessages.service.addOrRemoveBagInventory.unauthorized },
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      const findBagInventory = await this.bagInventoryRepository.findBagInventoryByBagId(bagId);
      if (!findBagInventory) {
        throw new HttpException(
          { message: bagInventoryErrorMessages.service.addOrRemoveBagInventory.bagNotFound },
          HttpStatus.BAD_REQUEST,
        );
      }
      const payloadToInventoryMovement = {
        bag_id: bagId,
        quantity: inventoryInfo.quantity,
        is_entry: inventoryInfo.is_entry,
        is_out: !inventoryInfo.is_entry,
        observation: inventoryInfo.observation,
        created_by: JSON.stringify({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        }),
      };
      if (inventoryInfo.is_entry) {
        await this.bagInventoryMovementRepository.createEntryInventoryMovement(payloadToInventoryMovement);
      } else {
        await this.bagInventoryMovementRepository.createOutInventoryMovement(payloadToInventoryMovement);
      }
      return { message: bagInventorySuccessMessages.service.addOrRemoveBagInventory.default };
    } catch (error) {
      const { message, status } = getErrorParams(
        error,
        bagInventoryErrorMessages.service.addOrRemoveBagInventory.default,
      );
      throw new HttpException({ message }, status);
    }
  }

  async listBagInventory(query: listBagInventoryDto): Promise<ListBagInventoryDomain[]> {
    const whereOptions = {
      bag: {
        available: Equal(true),
      },
    };
    if (query.name) {
      whereOptions['bag']['name'] = Like(`%${query.name}%`);
    }
    console.log(whereOptions);
    const repositoryResponse = await this.bagInventoryRepository.listAvailableBags(whereOptions);
    return BagInventoryMapper.listBagInventoryMapper(repositoryResponse);
  }
}
