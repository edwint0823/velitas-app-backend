import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';
import { cashInventoryDocumentationLabels, cashInventoryValidationMessages } from '../../../../core/constants';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateQuantityToCashInventoryDto {
  @ApiProperty({
    description: cashInventoryDocumentationLabels.updateQuantityOperation.quantityParamDescription,
    type: 'number',
    required: true,
    example: 20,
  })
  @IsNotEmpty({ message: cashInventoryValidationMessages.updateQuantityOperation.quantityRequired })
  @IsInt({ message: cashInventoryValidationMessages.updateQuantityOperation.quantityIsInt })
  @IsPositive({ message: cashInventoryValidationMessages.updateQuantityOperation.quantityIsPositive })
  quantity: number;
}
