import { findByEmailDomain } from '../model/out/findByEmailDomain';
import { createCustomerDomain } from '../model/in/createCustomerDomain';
import { paginateCustomers } from '../../adapters/model/paginateCustomers.dto';
import { listCustomersDomain } from '../model/out/listCustomersDomain';
import { UpdateCustomerDto } from '../../adapters/model/updateCustomer.dto';

export interface ICustomerService {
  findCustomer(email: string): Promise<findByEmailDomain>;

  create(customer: createCustomerDomain): Promise<{ message: string; id: number; email: string }>;

  paginateListCustomers(pageSize: number, pageNumber: number, query?: paginateCustomers): Promise<listCustomersDomain>;

  updateCustomer(email: string, customerInfo: UpdateCustomerDto): Promise<{ message: string }>;
}
