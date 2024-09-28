import { CustomerEntity } from '../../../../database/entities/Customer.entity';
import { createCustomerDomain } from '../model/in/createCustomerDomain';
import { FilterOptionsListCustomerDomain } from '../model/in/filterOptionsListCustomerDomain';
import { UpdateCustomerDomain } from '../model/in/updateCustomerDomain';

export interface ICustomerRepository {
  findByEmail(email: string): Promise<CustomerEntity | null>;

  createCustomer(customer: createCustomerDomain): Promise<CustomerEntity>;

  paginateCustomers(
    skip: number,
    take: number,
    whereOptions: FilterOptionsListCustomerDomain,
  ): Promise<{ customers: CustomerEntity[]; total: number }>;

  updateCustomer(email: string, customerInfo: UpdateCustomerDomain): Promise<CustomerEntity>;
}

export const ICustomerRepository = Symbol('ICustomerRepository');
