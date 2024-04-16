import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';
import { bagInventoryDocumentationLabels, bagInventoryValidationMessages } from '../../../../core/constants';

export class UpdateInventoryQuantityDto {
  @ApiProperty({
    description: bagInventoryDocumentationLabels.updateInventoryQuantityOperation.quantityParamDescription,
    example: 10,
    type: 'number',
    required: true,
  })
  @IsNotEmpty({ message: bagInventoryValidationMessages.updateInventoryQuantityOperation.quantityRequired })
  @IsInt({ message: bagInventoryValidationMessages.updateInventoryQuantityOperation.quantityIsInt })
  @IsPositive({ message: bagInventoryValidationMessages.updateInventoryQuantityOperation.quantityIsPositive })
  quantity: number;

  @ApiProperty({
    description: bagInventoryDocumentationLabels.updateInventoryQuantityOperation.isEntryParamDescription,
    example: true,
    type: 'boolean',
    required: true,
  })
  @IsNotEmpty({ message: bagInventoryValidationMessages.updateInventoryQuantityOperation.isEntryRequired })
  @IsBoolean({ message: bagInventoryValidationMessages.updateInventoryQuantityOperation.isEntryIsBoolean })
  is_entry: boolean;

  @ApiProperty({
    description: bagInventoryDocumentationLabels.updateInventoryQuantityOperation.observationParamDescription,
    example: 'Entrada de inventario por compra',
    type: 'string',
    required: true,
  })
  @IsNotEmpty({ message: bagInventoryValidationMessages.updateInventoryQuantityOperation.observationIsRequired })
  @IsString({ message: bagInventoryValidationMessages.updateInventoryQuantityOperation.observationIsString })
  observation: string;
}
