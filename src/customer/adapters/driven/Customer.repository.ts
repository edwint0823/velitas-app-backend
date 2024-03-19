import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../domain/outboundPorts/ICustomerRepository';
import { CustomerEntity } from '../../../../database/entities/Customer.entity';
import { DataSource, Repository } from 'typeorm';
import { createCustomerDomain } from '../../domain/model/createCustomerDomain';

@Injectable()
export class CustomerRepository
  extends Repository<CustomerEntity>
  implements ICustomerRepository
{
  constructor(public readonly dataSource: DataSource) {
    super(CustomerEntity, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<CustomerEntity | null> {
    return this.findOne({ where: { email } });
  }

  async createCustomer(
    customer: createCustomerDomain,
  ): Promise<CustomerEntity> {
    const newCustomer = new CustomerEntity();
    Object.assign(newCustomer, customer);
    return this.save(newCustomer);
  }
}
