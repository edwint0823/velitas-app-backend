import { findAllDomain } from '../model/out/findAllDomain';

export interface IBagService {
  getBagsAvailable(): Promise<findAllDomain[]>;
}
