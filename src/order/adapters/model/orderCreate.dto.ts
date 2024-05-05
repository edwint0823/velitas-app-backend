import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
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
import { orderDocumentationLabels, orderValidationMessages, priceTypeOptions } from '../../../../core/constants';

class customerInfoDto {
  @ApiProperty({
    description: orderDocumentationLabels.createOperation.emailCustomerParamDescription,
    example: 'example@example.com',
    required: true,
  })
  @IsString({
    message: orderValidationMessages.createOperation.emailCustomerIsString,
  })
  @IsEmail()
  @IsNotEmpty({
    message: orderValidationMessages.createOperation.emailCustomerRequired,
  })
  email: string;

  @ApiProperty({
    description: orderDocumentationLabels.createOperation.nameCustomerParamDescription,
    example: 'Juan Pérez',
    required: true,
  })
  @IsString({
    message: orderValidationMessages.createOperation.nameCustomerIsString,
  })
  @IsNotEmpty({ message: orderValidationMessages.createOperation.nameCustomerRequired })
  name: string;

  @ApiProperty({
    description: orderDocumentationLabels.createOperation.phoneCustomerParamDescription,
    example: '312 250 4520',
    required: true,
  })
  @IsString({
    message: orderValidationMessages.createOperation.phoneCustomerIsString,
  })
  @IsNotEmpty({ message: orderValidationMessages.createOperation.phoneCustomerRequired })
  phone_number: string;

  @ApiProperty({
    example: 'detal',
    description: orderDocumentationLabels.createOperation.priceTypeCustomerParamDescription,
    required: true,
    enum: priceTypeOptions,
  })
  @IsIn(priceTypeOptions, {
    message: `${orderValidationMessages.createOperation.priceTypeCustomerIsIn} ${priceTypeOptions.join(', ')}`,
  })
  price_type: string;
}

class NameList {
  @ApiProperty({
    description: orderDocumentationLabels.createOperation.nameListNameParamDescription,
    example: 'Juan',
    required: true,
  })
  @IsString({
    message: orderValidationMessages.createOperation.nameNameListIsString,
  })
  @IsNotEmpty({ message: orderValidationMessages.createOperation.nameNameListRequired })
  name: string;

  @ApiProperty({
    description: orderDocumentationLabels.createOperation.packAloneNameListParamDescription,
    example: true,
    required: true,
  })
  @IsBoolean()
  packAlone: boolean;

  @ApiProperty({
    description: orderDocumentationLabels.createOperation.deceasedNameListParamDescription,
    example: false,
    required: true,
  })
  @IsBoolean()
  deceased: boolean;

  @ApiProperty({
    description: orderDocumentationLabels.createOperation.petNameListParamDescription,
    example: true,
    required: true,
  })
  @IsBoolean()
  pet: boolean;
}

class Candle {
  @ApiProperty({
    description: orderDocumentationLabels.createOperation.candleOptionIdCandleParamDescription,
    example: 1,
    required: true,
  })
  @IsInt({ message: orderValidationMessages.createOperation.candleOptionIdCandleIsInt })
  @IsNotEmpty({ message: orderValidationMessages.createOperation.candleOptionIdCandleRequired })
  candle_option_id: number;

  @ApiProperty({
    type: [NameList],
    description: orderDocumentationLabels.createOperation.nameListCandleParamDescription,
  })
  @ValidateNested({ each: true })
  name_list: NameList[];

  @ApiProperty({
    description: orderDocumentationLabels.createOperation.priceCandleParamDescription,
    example: 15000,
    required: true,
  })
  @IsNumber()
  @IsPositive({ message: orderValidationMessages.createOperation.priceCandleIsPositive })
  @IsNotEmpty({ message: orderValidationMessages.createOperation.priceCandleRequired })
  price: number;

  @ApiProperty({ description: orderDocumentationLabels.createOperation.quantityCandleParamDescription, example: 1 })
  @IsInt({ message: orderValidationMessages.createOperation.quantityCandleIsInt })
  @IsPositive({ message: orderValidationMessages.createOperation.quantityCandleIsPositive })
  @IsNotEmpty({ message: orderValidationMessages.createOperation.quantityCandleRequired })
  quantity: number;

  @ApiPropertyOptional({
    description: orderDocumentationLabels.createOperation.observationCandleParamDescription,
    example: 'Sin observaciones',
  })
  @IsString({ message: orderValidationMessages.createOperation.observationCandleIsString })
  observation: string;
}

export class createOrderDto {
  @ApiProperty({
    type: customerInfoDto,
    description: orderDocumentationLabels.createOperation.customerParamDescription,
  })
  @ValidateNested()
  customer: customerInfoDto;

  @ApiProperty({ type: [Candle], description: orderDocumentationLabels.createOperation.candlesParamDescription })
  @ArrayNotEmpty({ message: orderValidationMessages.createOperation.candleNotEmpty })
  @ValidateNested({ each: true })
  candles: Candle[];
}
