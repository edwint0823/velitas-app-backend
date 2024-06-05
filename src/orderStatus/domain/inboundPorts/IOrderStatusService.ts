import { ListOrderStatusChangeLogsDto } from '../../adapters/model/ListOrderStatusChangeLogs.dto';
import { ListOrderStatusLogsDomain } from '../model/out/ListOrderStatusLogsDomain';

export interface IOrderStatusService {
  listOrderStatusChangeLogs(
    pageSize: number,
    pageNumber: number,
    query?: ListOrderStatusChangeLogsDto,
  ): Promise<ListOrderStatusLogsDomain>;
}
