import { ListBagInventoryMovementDto } from '../../adapters/model/ListBagInventoryMovement.dto';
import { ListBagInventoryMovementDomain } from '../model/out/bagInventoryMovementDomain';

export interface IBagInventoryMovementService {
  listBagInventoryMovements(
    pageSize: number,
    pageNumber: number,
    query?: ListBagInventoryMovementDto,
  ): Promise<ListBagInventoryMovementDomain>;
}
