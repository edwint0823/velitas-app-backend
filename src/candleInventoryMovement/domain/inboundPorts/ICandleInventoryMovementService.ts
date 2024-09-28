import { CandleInventoryMovementDomain } from '../model/out/candleInventoryMovementDomain';
import { ListCandleInventoryMovementDto } from '../../adapters/model/ListCandleInventoryMovement.dto';

export interface ICandleInventoryMovementService {
  listCandleInventoryMovements(
    pageSize: number,
    pageNumber: number,
    query?: ListCandleInventoryMovementDto,
  ): Promise<CandleInventoryMovementDomain>;
}
