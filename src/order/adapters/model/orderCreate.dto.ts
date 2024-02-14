import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { priceTypeOptions } from '../../../../core/constants';

class customerInfoDto {
  @ApiProperty({
    description: 'Correo electrónico del cliente',
    example: 'example@example.com',
    required: true,
  })
  @IsString({
    message:
      'El correo electrónico del cliente debe ser una cadena de caracteres',
  })
  @IsEmail()
  @IsNotEmpty({
    message: 'El correo del cliente es requerido',
  })
  email: string;

  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Juan Pérez',
    required: true,
  })
  @IsString({
    message: 'El nombre del cliente debe ser una cadena de caracteres',
  })
  @IsNotEmpty({ message: 'El nombre del cliente es requerido' })
  name: string;

  @ApiProperty({
    description: 'Número de teléfono del cliente',
    example: '312 250 4520',
    required: true,
  })
  @IsString({
    message:
      'El número telefónico del cliente debe ser una cadena de caracteres',
  })
  @IsNotEmpty({ message: 'El número telefónico  del cliente es requerido' })
  phone_number: string;

  @ApiProperty({
    example: 'detal',
    description: 'Tipo de catalogo para precios',
    required: true,
    enum: priceTypeOptions,
  })
  @IsIn(priceTypeOptions, {
    message: `El tipo de precio debe estar dentro de uno de los siguientes valores: ${priceTypeOptions.join(', ')}`,
  })
  price_type: string;
}

class NameList {
  @ApiProperty({
    description: 'Nombre de una vela',
    example: 'Juan',
    required: true,
  })
  @IsString({
    message: 'El nombre de la vela debe ser una cadena de caracteres',
  })
  @IsNotEmpty({ message: 'El nombre de la vela es requerido' })
  name: string;

  @ApiProperty({
    description: '¿Empacar en bolsa x1?',
    example: true,
    required: true,
  })
  @IsBoolean()
  packAlone: boolean;

  @ApiProperty({
    description: '¿Es difunto?',
    example: false,
    required: true,
  })
  @IsBoolean()
  deceased: boolean;

  @ApiProperty({
    description: '¿Es una mascota?',
    example: true,
    required: true,
  })
  @IsBoolean()
  pet: boolean;
}

class Candle {
  @ApiProperty({
    description: 'ID de opción de vela',
    example: 1,
    required: true,
  })
  @IsInt({ message: 'La opción de vela seleccionada debe ser un número' })
  @IsNotEmpty({ message: 'Debe seleccionar un diseño de vela' })
  candle_option_id: number;

  @ApiProperty({ type: [NameList], description: 'Lista de nombres' })
  @ValidateNested({ each: true })
  name_list: NameList[];

  @ApiProperty({
    description: 'Precio de la vela',
    example: 15000.5,
    required: true,
  })
  @IsNumber()
  @IsPositive({ message: 'El precio de la vela debe ser un número positivo' })
  @IsNotEmpty({ message: 'El precio de la vela es requerido' })
  price: number;

  @ApiProperty({ description: 'Cantidad de velas', example: 1 })
  @IsInt({ message: 'La cantidad de velas debe ser un número entero' })
  @IsPositive({ message: 'La cantidad de velas debe ser un número positivo' })
  @IsNotEmpty({ message: 'La cantidad de velas es requerido' })
  quantity: number;
  @ApiPropertyOptional({
    description: 'Observación de la vela o nombres',
    example: 'Sin observaciones',
  })
  @IsString({ message: 'La Observación debe ser un string ' })
  observation: string;
}

export class createOrderDto {
  @ApiProperty({
    type: customerInfoDto,
    description: 'Información del cliente ',
  })
  @ValidateNested()
  customer: customerInfoDto;

  @ApiProperty({ type: [Candle], description: 'Lista de velas' })
  @ValidateNested({ each: true })
  candles: Candle[];
}
