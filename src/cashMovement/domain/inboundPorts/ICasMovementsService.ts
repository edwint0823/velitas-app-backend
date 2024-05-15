import { ListCashMovementDto } from '../../adapters/model/listCashMovement.dto';
import { ListCashMovementsDomain } from '../model/out/ListCashMovementsDomain';

export interface ICasMovementsService {
  listAllCashMovements(
    pageSize: number,
    pageNumber: number,
    query?: ListCashMovementDto,
  ): Promise<ListCashMovementsDomain>;
}
