import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { IAuthUser, orderValidationMessages, timeZoneDayjs } from '../../../../core/constants';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es-mx.js';

dayjs.locale(timeZoneDayjs);

export class QueryParamsListOrderDto {
  @IsOptional()
  @Transform(({ value }) => {
    return value.split(',');
  })
  @IsArray({ message: orderValidationMessages.paginateListOperation.orderCodeIsArray })
  @ArrayNotEmpty({ message: orderValidationMessages.paginateListOperation.orderCodeRequired })
  @IsNumberString({}, { each: true, message: orderValidationMessages.paginateListOperation.orderCodeIsNumber })
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
  user: IAuthUser;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsInt({ message: orderValidationMessages.paginateListOperation.statusIdIsInt })
  public status?: number;

  @IsOptional()
  @IsString({ message: orderValidationMessages.paginateListOperation.candleNameIsString })
  public candle_name?: string;
}
