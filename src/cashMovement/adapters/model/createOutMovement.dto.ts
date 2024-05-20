import { ApiProperty } from '@nestjs/swagger';
import { cashMovementsDocumentationsLabels, cashMovementsValidationsMessages } from '../../../../core/constants';
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOutMovementDto {
  @ApiProperty({
    type: 'number',
    example: 1,
    required: true,
    description: cashMovementsDocumentationsLabels.createOutMovementOperation.bankIdParamDescription,
  })
  @IsNotEmpty({ message: cashMovementsValidationsMessages.createOutMovementOperation.bankEntityIdIsRequired })
  @IsInt({ message: cashMovementsValidationsMessages.createOutMovementOperation.bankEntityIdIsInt })
  bank_entity_id: number;

  @ApiProperty({
    type: 'number',
    example: 10000,
    required: true,
    description: cashMovementsDocumentationsLabels.createOutMovementOperation.amountParamDescription,
  })
  @IsNotEmpty({ message: cashMovementsValidationsMessages.createOutMovementOperation.amountIsRequired })
  @IsNumber({}, { message: cashMovementsValidationsMessages.createOutMovementOperation.amountIsNumber })
  amount: number;

  @ApiProperty({
    type: 'string',
    example: 'Compra de materiales',
    required: true,
    description: cashMovementsDocumentationsLabels.createOutMovementOperation.conceptParamDescription,
  })
  @IsNotEmpty({ message: cashMovementsValidationsMessages.createOutMovementOperation.conceptIsRequired })
  @IsString({ message: cashMovementsValidationsMessages.createOutMovementOperation.conceptIsString })
  concept: string;
}
