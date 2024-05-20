import { ListCashMovementDto } from '../../adapters/model/listCashMovement.dto';
import { ListCashMovementsDomain } from '../model/out/ListCashMovementsDomain';
import { CreateOutMovementDto } from '../../adapters/model/createOutMovement.dto';
import { IAuthUser } from '../../../../core/constants';

export interface ICasMovementsService {
  listAllCashMovements(
    pageSize: number,
    pageNumber: number,
    query?: ListCashMovementDto,
  ): Promise<ListCashMovementsDomain>;

  createOutMovement(movementInfo: CreateOutMovementDto, user: IAuthUser): Promise<{ message: string }>;
}
