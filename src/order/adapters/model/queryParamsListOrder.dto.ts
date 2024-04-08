import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IAuthUser, orderValidationMessages, timeZoneDayjs } from '../../../../core/constants';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es-mx.js';

dayjs.locale(timeZoneDayjs);

export class FiltersDto {
  @IsOptional()
  @Transform(({ value }) => {
    const arrString = value.split(',');
    return arrString.map((x) => parseInt(x));
  })
  @IsArray({ message: orderValidationMessages.paginateListOperation.orderCodeIsArray })
  @ArrayNotEmpty({ message: orderValidationMessages.paginateListOperation.orderCodeRequired })
  @IsNumber({}, { each: true, message: orderValidationMessages.paginateListOperation.orderCodeIsNumber })
  public orders_code?: number[];

  @IsOptional()
  @IsNotEmpty({ message: orderValidationMessages.paginateListOperation.deliveryDateBeginRequired })
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: orderValidationMessages.paginateListOperation.deliveryDateBeginIsDate })
  public delivery_date_begin?: Date;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: orderValidationMessages.paginateListOperation.deliveryDateEndIsDate })
  public delivery_date_end?: Date;

  @IsOptional()
  @IsNotEmpty({ message: orderValidationMessages.paginateListOperation.createdAtBeginRequired })
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: orderValidationMessages.paginateListOperation.createdAtBeginIsDate })
  public created_at_begin?: Date;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: orderValidationMessages.paginateListOperation.createdAtEndIsDate })
  public created_at_end?: Date;

  @IsOptional()
  @IsString({ message: orderValidationMessages.paginateListOperation.customerNameIsString })
  public customer_name?: string;
}

export class QueryParamsListOrderDto {
  @ValidateNested()
  filters: FiltersDto;
  user: IAuthUser;
}
