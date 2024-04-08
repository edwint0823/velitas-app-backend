import { StatusListDomain } from '../model/out/listStatusDomain';

export interface IStatusService {
  statusList(order: number): Promise<StatusListDomain[]>;
}
