import { ArrayNotEmpty, IsArray, IsBoolean, IsDate, IsInt, IsNumberString, IsOptional } from 'class-validator';
import { cashMovementsValidationsMessages, IAuthUser, timeZoneDayjs } from '../../../../core/constants';
import { Transform, Type } from 'class-transformer';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es-mx.js';

dayjs.locale(timeZoneDayjs);

export class ListCashMovementDto {
  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: cashMovementsValidationsMessages.listAllOperations.entryMovementIsBoolean })
  entry_movement?: boolean;

  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: cashMovementsValidationsMessages.listAllOperations.outMovementIsBoolean })
  out_movement?: boolean;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? parseInt(value) : value))
  @IsInt({ message: cashMovementsValidationsMessages.listAllOperations.bankEntityIdIsNumber })
  bank_entity?: number;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: cashMovementsValidationsMessages.listAllOperations.createdAtBeginIsDate })
  created_at_begin?: Date;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: cashMovementsValidationsMessages.listAllOperations.createdAtEndIsDate })
  created_at_end?: Date;

  @IsOptional()
  @Transform(({ value }) => {
    return value.split(',');
  })
  @IsArray({ message: cashMovementsValidationsMessages.listAllOperations.ordersCodeIsArray })
  @ArrayNotEmpty({ message: cashMovementsValidationsMessages.listAllOperations.orderCodeRequired })
  @IsNumberString(
    {},
    {
      each: true,
      message: cashMovementsValidationsMessages.listAllOperations.orderCodeIsStringNumber,
    },
  )
  orders_code?: string[];
  user: IAuthUser;
}
