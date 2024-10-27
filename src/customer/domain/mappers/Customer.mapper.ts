import { Injectable } from '@nestjs/common';
import { findByEmailDomain } from '../model/out/findByEmailDomain';
import { CustomerEntity } from '../../../../database/entities/Customer.entity';
import { listCustomersDomain } from '../model/out/listCustomersDomain';
import * as dayjs from 'dayjs';
import { timeZoneDayjs } from '../../../../core/constants';

dayjs.locale(timeZoneDayjs);

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
        orders: [],
      };
    }
    return {
      found: true,
      email: entity.email,
      name: entity.name,
      tel: entity.phone_number,
      priceType: entity.price_type,
      orders: entity.orders.map((order) => {
        return {
          code: order.code,
          created_at: dayjs(order.created_at).format('DD-MM-YYYY'),
        };
      }),
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
