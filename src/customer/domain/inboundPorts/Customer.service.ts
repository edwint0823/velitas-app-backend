import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ICustomerService } from './ICustomerService';
import { ICustomerRepository } from '../outboundPorts/ICustomerRepository';
import { customerMapper } from '../mappers/Customer.mapper';
import { findByEmailDomain } from '../model/findByEmailDomain';
import { createCustomerDomain } from '../model/createCustomerDomain';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';
import { customerErrorMessages, customerSuccessMessages } from '../../../../core/constants';

@Injectable()
export class CustomerService implements ICustomerService {
  constructor(
    @Inject(ICustomerRepository)
    private readonly customerRepository: ICustomerRepository,
  ) {}

  async findCustomer(email: string): Promise<findByEmailDomain> {
    const repositoryResponse = await this.customerRepository.findByEmail(email);
    return customerMapper.findByEmailMapper(repositoryResponse);
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
}
