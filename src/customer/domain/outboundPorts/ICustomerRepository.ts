import { CustomerEntity } from '../../../../database/entities/Customer.entity';
import { createCustomerDomain } from '../model/createCustomerDomain';

export interface ICustomerRepository {
  findByEmail(email: string): Promise<CustomerEntity | null>;

  createCustomer(customer: createCustomerDomain): Promise<CustomerEntity>;
}

export const ICustomerRepository = Symbol('ICustomerRepository');
