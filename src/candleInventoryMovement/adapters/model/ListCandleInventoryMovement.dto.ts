import { candleInventoryMovementsValidationMessages, IAuthUser, timeZoneDayjs } from '../../../../core/constants';
import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es-mx.js';

dayjs.locale(timeZoneDayjs);

export class ListCandleInventoryMovementDto {
  @IsOptional()
  @IsInt({ message: candleInventoryMovementsValidationMessages.listOperation.candleTypeIdIsInt })
  candle_type_id?: number;

  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: candleInventoryMovementsValidationMessages.listOperation.entryMovementIsBoolean })
  entry_movement?: boolean;

  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: candleInventoryMovementsValidationMessages.listOperation.outMovementIsBoolean })
  out_movement?: boolean;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: candleInventoryMovementsValidationMessages.listOperation.createdAtBeginIsDate })
  created_at_begin?: Date;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: candleInventoryMovementsValidationMessages.listOperation.createdAtEndIsDate })
  created_at_end?: Date;

  @IsOptional()
  @IsString({ message: candleInventoryMovementsValidationMessages.listOperation.createdAtNameIsString })
  created_by_name?: string;

  user: IAuthUser;
}
