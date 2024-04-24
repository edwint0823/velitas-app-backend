import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { orderDocumentationLabels, orderValidationMessages } from '../../../../core/constants';

class NameList {
  @ApiProperty({
    description: orderDocumentationLabels.updateOrderAndDetailOperation.nameListNameParamDescription,
    example: 'Juan',
    required: true,
  })
  @IsString({
    message: orderValidationMessages.updateOrderAndDetailOperation.nameNameListIsString,
  })
  @IsNotEmpty({ message: orderValidationMessages.updateOrderAndDetailOperation.nameNameListRequired })
  name: string;

  @ApiProperty({
    description: orderDocumentationLabels.updateOrderAndDetailOperation.packAloneNameListParamDescription,
    example: true,
    required: true,
  })
  @IsBoolean({ message: orderValidationMessages.updateOrderAndDetailOperation.packAloneNameListIsBoolean })
  packAlone: boolean;

  @ApiProperty({
    description: orderDocumentationLabels.updateOrderAndDetailOperation.deceasedNameListParamDescription,
    example: false,
    required: true,
  })
  @IsBoolean({ message: orderValidationMessages.updateOrderAndDetailOperation.deceasedNameListIsBoolean })
  deceased: boolean;

  @ApiProperty({
    description: orderDocumentationLabels.updateOrderAndDetailOperation.petNameListParamDescription,
    example: true,
    required: true,
  })
  @IsBoolean({ message: orderValidationMessages.updateOrderAndDetailOperation.petNameListIsBoolean })
  pet: boolean;
}

class CandleObj {
  @ApiProperty({
    description: orderDocumentationLabels.updateOrderAndDetailOperation.candleOptionIdCandleParamDescription,
    example: 3,
    required: true,
  })
  @IsInt({ message: orderValidationMessages.updateOrderAndDetailOperation.candleOptionIdCandleIsInt })
  @IsNotEmpty({ message: orderValidationMessages.updateOrderAndDetailOperation.candleOptionIdCandleRequired })
  candle_option_id: number;

  @ApiProperty({
    description: orderDocumentationLabels.updateOrderAndDetailOperation.candleTypeIdCandleParamDescription,
    example: 2,
    required: true,
  })
  @IsInt({ message: orderValidationMessages.updateOrderAndDetailOperation.candleTypeIdCandleIsInt })
  @IsNotEmpty({ message: orderValidationMessages.updateOrderAndDetailOperation.candleTypeIdCandleRequired })
  candle_type_id: number;

  @ApiProperty({
    type: [NameList],
    description: orderDocumentationLabels.updateOrderAndDetailOperation.nameListCandleParamDescription,
  })
  @ValidateNested({ each: true })
  name_list: NameList[];

  @ApiProperty({
    description: orderDocumentationLabels.updateOrderAndDetailOperation.priceCandleParamDescription,
    example: 15000,
    required: true,
  })
  @IsNumber({}, { message: '' })
  @IsPositive({ message: orderValidationMessages.updateOrderAndDetailOperation.priceCandleIsPositive })
  @IsNotEmpty({ message: orderValidationMessages.updateOrderAndDetailOperation.priceCandleRequired })
  price: number;

  @ApiProperty({
    description: orderDocumentationLabels.updateOrderAndDetailOperation.quantityCandleParamDescription,
    example: 1,
  })
  @IsInt({ message: orderValidationMessages.updateOrderAndDetailOperation.quantityCandleIsInt })
  @IsPositive({ message: orderValidationMessages.updateOrderAndDetailOperation.quantityCandleIsPositive })
  @IsNotEmpty({ message: orderValidationMessages.updateOrderAndDetailOperation.quantityCandleRequired })
  quantity: number;

  @ApiPropertyOptional({
    description: orderDocumentationLabels.updateOrderAndDetailOperation.observationCandleParamDescription,
    example: 'Sin observaciones',
  })
  @IsString({ message: orderValidationMessages.updateOrderAndDetailOperation.observationCandleIsString })
  observation: string;
}

export class OrderUpdateDto {
  @ApiProperty({
    type: 'string',
    required: true,
    description: orderDocumentationLabels.updateOrderAndDetailOperation.deliveryAddressParamDescription,
  })
  @IsNotEmpty({ message: orderValidationMessages.updateOrderAndDetailOperation.deliveryAddressIsRequired })
  @IsString({ message: orderValidationMessages.updateOrderAndDetailOperation.deliveryAddressIsString })
  delivery_address: string;

  @ApiProperty({
    type: 'string',
    required: false,
    description: orderDocumentationLabels.updateOrderAndDetailOperation.additionalInfoParamDescription,
  })
  @IsOptional()
  @IsString({ message: orderValidationMessages.updateOrderAndDetailOperation.additionalInfoIsString })
  additional_info: string | undefined;

  @ApiProperty({
    type: 'number',
    required: false,
    description: orderDocumentationLabels.updateOrderAndDetailOperation.deliveryPriceParamDescription,
  })
  @IsOptional()
  @IsNumber({}, { message: orderValidationMessages.updateOrderAndDetailOperation.deliveryPriceIsNumber })
  @IsPositive({ message: orderValidationMessages.updateOrderAndDetailOperation.deliveryPriceIsPositive })
  delivery_price: number | undefined;

  @ApiProperty({
    type: [CandleObj],
    description: orderDocumentationLabels.updateOrderAndDetailOperation.candlesParamDescription,
  })
  @ArrayNotEmpty({ message: orderValidationMessages.updateOrderAndDetailOperation.candleNotEmpty })
  @ValidateNested({ each: true })
  candles: CandleObj[];
}
