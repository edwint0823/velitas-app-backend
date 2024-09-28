import { bagInventoryMovementsValidationMessages, IAuthUser, timeZoneDayjs } from '../../../../core/constants';
import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es-mx.js';

dayjs.locale(timeZoneDayjs);

export class ListBagInventoryMovementDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: bagInventoryMovementsValidationMessages.listOperation.bagIdIsInt })
  bag_id?: number;

  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: bagInventoryMovementsValidationMessages.listOperation.entryMovementIsBoolean })
  entry_movement?: boolean;

  @IsOptional()
  @Type(() => String)
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: bagInventoryMovementsValidationMessages.listOperation.outMovementIsBoolean })
  out_movement?: boolean;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: bagInventoryMovementsValidationMessages.listOperation.createdAtBeginIsDate })
  created_at_begin?: Date;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: bagInventoryMovementsValidationMessages.listOperation.createdAtEndIsDate })
  created_at_end?: Date;

  @IsOptional()
  @IsString({ message: bagInventoryMovementsValidationMessages.listOperation.createdAtNameIsString })
  created_by_name?: string;

  user: IAuthUser;
}
