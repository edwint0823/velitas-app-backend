import { HttpException, Inject, Injectable } from '@nestjs/common';
import { IBagService } from './IBagService';
import { findAllDomain } from '../model/out/findAllDomain';
import { IBagRepository } from '../outboundPorts/IBagRepository';
import { BagMapper } from '../mappers/Bag.mapper';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';

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
      const { message, status } = getErrorParams(
        error,
        'Error al obtener el listado de bolsas',
      );
      throw new HttpException(message, status);
    }
  }
}
