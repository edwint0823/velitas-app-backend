import { Injectable } from '@nestjs/common';
import { findByEmailDomain } from '../model/out/findByEmailDomain';
import { CustomerEntity } from '../../../../database/entities/Customer.entity';
import { listCustomersDomain } from '../model/out/listCustomersDomain';

@Injectable()
export class CustomerMapper {
  public static findByEmailMapper(entity: CustomerEntity | null): findByEmailDomain {
    if (entity === null) {
      return {
        found: false,
        email: '',
        name: '',
        tel: '',
        priceType: 'detal',
      };
    }
    return {
      found: true,
      email: entity.email,
      name: entity.name,
      tel: entity.phone_number,
      priceType: entity.price_type,
    };
  }

  public static ListCustomerMapper(repositoryResponse: {
    customers: CustomerEntity[];
    total: number;
  }): listCustomersDomain {
    const customers = repositoryResponse.customers.map((customer) => {
      return {
        email: customer.email,
        name: customer.name,
        phone_number: customer.phone_number,
        price_type: customer.price_type,
      };
    });
    return { customers, total: repositoryResponse.total };
  }
}
