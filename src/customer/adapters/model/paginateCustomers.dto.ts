import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { customerValidationMessages } from '../../../../core/constants';

export class paginateCustomers {
  @IsOptional()
  @IsString({ message: customerValidationMessages.listPaginateOperation.emailIsString })
  email?: string;

  @IsOptional()
  @IsString({ message: customerValidationMessages.listPaginateOperation.nameIsString })
  name?: string;

  @IsOptional()
  @Type(() => String)
  phone_number?: string;

  @IsOptional()
  @IsString({ message: customerValidationMessages.listPaginateOperation.priceTypeIsString })
  price_type?: string;
}
