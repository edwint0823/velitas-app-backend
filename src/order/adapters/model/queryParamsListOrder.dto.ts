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
import { IAuthUser, timeZoneDayjs } from '../../../../core/constants';
import * as dayjs from 'dayjs';
import 'dayjs/locale/es-mx.js';

dayjs.locale(timeZoneDayjs);

export class FiltersDto {
  @IsOptional()
  @Transform(({ value }) => {
    const arrString = value.split(',');
    return arrString.map((x) => parseInt(x));
  })
  @IsArray({ message: 'El listado de Números de pedidos deben ser una lista' })
  @ArrayNotEmpty({ message: 'El listado de Números de pedido debe tener al menos un item' })
  @IsNumber({}, { each: true, message: 'Todos los códigos de pedido deben ser números' })
  public orders_code?: number[];

  @IsOptional()
  @IsNotEmpty({ message: 'La fecha inicial de entrega es requerida' })
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: 'La fecha inicial de entrega debe ser una fecha' })
  public delivery_date_begin?: Date;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: 'La fecha final de entrega debe ser una fecha' })
  public delivery_date_end?: Date;

  @IsOptional()
  @IsNotEmpty({ message: 'La fecha inicial de creación del pedido es requerida' })
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: 'La fecha inicial de creación del pedido debe ser una fecha' })
  public created_at_begin?: Date;

  @IsOptional()
  @Transform(({ value }) => (typeof value === 'string' ? dayjs(value).toDate() : value), { toClassOnly: true })
  @IsDate({ message: 'La fecha final de creación del pedido debe ser una fecha' })
  public created_at_end?: Date;

  @IsOptional()
  @IsString({ message: 'El nombre del cliente debe ser una cadena de texto' })
  public customer_name?: string;
}

export class QueryParamsListOrderDto {
  @ValidateNested()
  filters: FiltersDto;
  user: IAuthUser;
}
