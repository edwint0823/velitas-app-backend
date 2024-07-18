import { Injectable } from '@nestjs/common';
import { ICustomerRepository } from '../../domain/outboundPorts/ICustomerRepository';
import { CustomerEntity } from '../../../../database/entities/Customer.entity';
import { DataSource, Repository } from 'typeorm';
import { createCustomerDomain } from '../../domain/model/in/createCustomerDomain';
import { FilterOptionsListCustomerDomain } from '../../domain/model/in/filterOptionsListCustomerDomain';
import { UpdateCustomerDomain } from '../../domain/model/in/updateCustomerDomain';

@Injectable()
export class CustomerRepository extends Repository<CustomerEntity> implements ICustomerRepository {
  constructor(public readonly dataSource: DataSource) {
    super(CustomerEntity, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<CustomerEntity | null> {
    return this.findOne({ where: { email } });
  }

  async createCustomer(customer: createCustomerDomain): Promise<CustomerEntity> {
    const newCustomer = new CustomerEntity();
    Object.assign(newCustomer, customer);
    return this.save(newCustomer);
  }

  async paginateCustomers(
    skip: number,
    take: number,
    whereOptions: FilterOptionsListCustomerDomain,
  ): Promise<{ customers: CustomerEntity[]; total: number }> {
    const customers = await this.find({
      where: whereOptions,
      skip: skip,
      take: take,
      order: { name: 'ASC' },
    });
    const total = await this.count({ where: whereOptions });
    return { customers, total };
  }

  async updateCustomer(email: string, customer: UpdateCustomerDomain): Promise<CustomerEntity> {
    const findedCustomer = await this.findOne({ where: { email } });
    findedCustomer.name = customer.name;
    findedCustomer.phone_number = customer.phone_number;
    findedCustomer.price_type = customer.price_type;
    return await this.save(findedCustomer);
  }
}
