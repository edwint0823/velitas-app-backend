import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsIn, IsString } from 'class-validator';
import { priceTypeOptions } from '../../../../core/constants';

export class createCustomerDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'correo electrónico del cliente ',
    required: true,
  })
  @IsString({
    message:
      'El correo electrónico del cliente debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El correo del cliente es requerido',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'EDWIN TOBIAS ARIZA TELLEZ',
    description: 'correo electrónico del cliente ',
    required: true,
  })
  @IsString({
    message: 'El nombre del cliente debe ser una cadena de caracteres',
  })
  @IsNotEmpty({
    message: 'El nombre del cliente es requerido',
  })
  name: string;

  @ApiProperty({
    example: '315 250 2320',
    description: 'Número telefónico del cliente',
    required: true,
  })
  @IsNotEmpty({
    message: 'El número telefónico del cliente es requerido',
  })
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
