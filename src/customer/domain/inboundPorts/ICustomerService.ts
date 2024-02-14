import { findByEmailDomain } from '../model/findByEmailDomain';
import { createCustomerDomain } from '../model/createCustomerDomain';

export interface ICustomerService {
  findCustomer(email: string): Promise<findByEmailDomain>;

  create(
    customer: createCustomerDomain,
  ): Promise<{ message: string; id: number; email: string }>;
}
