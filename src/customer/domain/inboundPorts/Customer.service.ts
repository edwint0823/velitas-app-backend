import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ICustomerService } from './ICustomerService';
import { ICustomerRepository } from '../outboundPorts/ICustomerRepository';
import { CustomerMapper } from '../mappers/Customer.mapper';
import { findByEmailDomain } from '../model/out/findByEmailDomain';
import { createCustomerDomain } from '../model/in/createCustomerDomain';
import { getErrorParams } from '../../../../core/errorsHandlers/getErrorParams';
import { customerErrorMessages, customerSuccessMessages } from '../../../../core/constants';
import { paginateCustomers } from '../../adapters/model/paginateCustomers.dto';
import { listCustomersDomain } from '../model/out/listCustomersDomain';
import { UpdateCustomerDto } from '../../adapters/model/updateCustomer.dto';
import { ILike } from 'typeorm';

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
      whereOptions['name'] = ILike(`%${query.name}%`);
    }
    if (query.email) {
      whereOptions['email'] = ILike(`%${query.email}%`);
    }
    if (query.phone_number) {
      whereOptions['phone_number'] = ILike(`%${query.phone_number}%`);
    }
    if (query.price_type) {
      whereOptions['price_type'] = query.price_type;
    }
    const skip = (pageNumber - 1) * pageSize;
    const repositoryResponse = await this.customerRepository.paginateCustomers(skip, pageSize, whereOptions);
    return CustomerMapper.ListCustomerMapper(repositoryResponse);
  }

  async updateCustomer(email: string, customerInfo: UpdateCustomerDto): Promise<{ message: string }> {
    try {
      const findCustomer = await this.customerRepository.findByEmail(email);
      if (!findCustomer) {
        throw new HttpException({ message: customerErrorMessages.serviceErrors.update }, HttpStatus.BAD_REQUEST);
      }
      await this.customerRepository.updateCustomer(email, customerInfo);
      return { message: customerSuccessMessages.service.update };
    } catch (e) {
      const { message, status } = getErrorParams(e, customerErrorMessages.serviceErrors.update.default);
      throw new HttpException({ message }, status);
    }
  }
}
