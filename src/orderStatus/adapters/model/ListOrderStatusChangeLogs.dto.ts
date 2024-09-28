import { IAuthUser, orderStatusChangeLogsValidationMessages, timeZoneDayjs } from '../../../../core/constants';
import { IsDate, IsNumberString, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es-mx.js';

dayjs.locale(timeZoneDayjs);

export class ListOrderStatusChangeLogsDto {
  @IsOptional()
  @IsNumberString({}, { message: orderStatusChangeLogsValidationMessages.listOperation.orderCodeIsStringNumber })
  order_code: string;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: orderStatusChangeLogsValidationMessages.listOperation.createdAtBeginIsDate })
  created_at_begin?: Date;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: orderStatusChangeLogsValidationMessages.listOperation.createdAtEndIsDate })
  created_at_end?: Date;

  @IsOptional()
  @IsString({ message: orderStatusChangeLogsValidationMessages.listOperation.createdAtNameIsString })
  created_by_name?: string;

  user: IAuthUser;
}
