import { HttpException, Inject, Injectable } from '@nestjs/common';
import { IBagService } from './IBagService';
import { findAllDomain } from '../model/out/findAllDomain';
import { IBagRepository } from '../outboundPorts/IBagRepository';
import { BagMapper } from '../mappers/Bag.mapper';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';
import { bagErrorMessages } from '../../../../core/constants';

@Injectable()
export class BagService implements IBagService {
  constructor(
    @Inject(IBagRepository)
    private readonly bagRepository: IBagRepository,
  ) {}

  async getBagsAvailable(): Promise<findAllDomain[]> {
    try {
      const BagRepo = await this.bagRepository.listAllBagsAvailable();
      return BagMapper.listBagsMapper(BagRepo);
    } catch (error) {
      const { message, status } = getErrorParams(error, bagErrorMessages.serviceErrors.getAvailable.default);
      throw new HttpException({ message }, status);
    }
  }
}
