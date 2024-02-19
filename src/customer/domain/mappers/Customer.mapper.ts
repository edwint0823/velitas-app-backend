import { Injectable } from '@nestjs/common';
import { findByEmailDomain } from '../model/findByEmailDomain';
import { CustomerEntity } from '../../../../database/entities/Customer.entity';

@Injectable()
export class customerMapper {
  public static findByEmailMapper(
    entity: CustomerEntity | null,
  ): findByEmailDomain {
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
}
