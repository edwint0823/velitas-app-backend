import { ApiProperty } from '@nestjs/swagger';
import { candleInventoryDocumentationLabels, candleInventoryValidationMessages } from '../../../../core/constants';
import { IsBoolean, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class UpdateCandleInventoryQuantityDto {
  @ApiProperty({
    description: candleInventoryDocumentationLabels.addOrRemoveInventoryOperation.quantityParamDescription,
    example: 10,
    type: 'number',
    required: true,
  })
  @IsNotEmpty({ message: candleInventoryValidationMessages.addOrRemoveInventoryOperation.quantityRequired })
  @IsInt({ message: candleInventoryValidationMessages.addOrRemoveInventoryOperation.quantityIsInt })
  @IsPositive({ message: candleInventoryValidationMessages.addOrRemoveInventoryOperation.quantityIsPositive })
  quantity: number;

  @ApiProperty({
    description: candleInventoryDocumentationLabels.addOrRemoveInventoryOperation.isEntryParamDescription,
    example: true,
    type: 'boolean',
    required: true,
  })
  @IsNotEmpty({ message: candleInventoryValidationMessages.addOrRemoveInventoryOperation.isEntryRequired })
  @IsBoolean({ message: candleInventoryValidationMessages.addOrRemoveInventoryOperation.isEntryIsBoolean })
  is_entry: boolean;

  @ApiProperty({
    description: candleInventoryDocumentationLabels.addOrRemoveInventoryOperation.observationParamDescription,
    example: 'Entrada de inventario por compra',
    type: 'string',
    required: true,
  })
  @IsNotEmpty({ message: candleInventoryValidationMessages.addOrRemoveInventoryOperation.observationIsRequired })
  @IsString({ message: candleInventoryValidationMessages.addOrRemoveInventoryOperation.observationIsString })
  observation: string;
}
