import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ICustomerService } from './ICustomerService';
import { ICustomerRepository } from '../outboundPorts/ICustomerRepository';
import { CustomerMapper } from '../mappers/Customer.mapper';
import { findByEmailDomain } from '../model/out/findByEmailDomain';
import { createCustomerDomain } from '../model/in/createCustomerDomain';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';
import { customerErrorMessages, customerSuccessMessages } from '../../../../core/constants';
import { paginateCustomers } from '../../adapters/model/paginateCustomers.dto';
import { listCustomersDomain } from '../model/out/listCustomersDomain';

@Injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async findCustomer(email: string): Promise<findByEmailDomain> {
    const repositoryResponse = await this.customerRepository.findByEmail(email);
    return CustomerMapper.findByEmailMapper(repositoryResponse);
  }

  async create(customer: createCustomerDomain): Promise<{ message: string; id: number; email: string }> {
    try {
      const customerCreated = await this.customerRepository.createCustomer(customer);
      return {
        message: customerSuccessMessages.service.create,
        id: customerCreated.id,
        email: customerCreated.email,
      };
    } catch (error) {
      const { message, status } = getErrorParams(error, customerErrorMessages.serviceErrors.create.default);
      throw new HttpException({ message }, status);
    }
  }

  async paginateListCustomers(
    pageSize: number,
    pageNumber: number,
    query?: paginateCustomers,
  ): Promise<listCustomersDomain> {
    const whereOptions = {};
    if (query.name) {
      whereOptions['name'] = query.name;
    }
    if (query.email) {
      whereOptions['email'] = query.email;
    }
    if (query.phone_number) {
      whereOptions['phone_number'] = query.phone_number;
    }
    if (query.price_type) {
      whereOptions['price_type'] = query.price_type;
    }
    const skip = (pageNumber - 1) * pageSize;
    const repositoryResponse = await this.customerRepository.paginateCustomers(skip, pageSize, whereOptions);
    console.log(repositoryResponse);
    return CustomerMapper.ListCustomerMapper(repositoryResponse);
  }
}
