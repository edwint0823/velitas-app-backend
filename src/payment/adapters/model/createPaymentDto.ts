import { ApiProperty } from '@nestjs/swagger';
import { paymentDocumentationLabels, paymentValidationMessages } from '../../../../core/constants';
import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreatePaymentDto {
  @ApiProperty({
    description: paymentDocumentationLabels.createOperation.orderCodeParamDescription,
    example: '758211',
    type: 'string',
    required: true,
  })
  @IsNotEmpty({ message: paymentValidationMessages.createOperation.orderCodeRequired })
  @IsString({ message: paymentValidationMessages.createOperation.orderCodeIsString })
  order_code: string;

  @ApiProperty({
    description: paymentDocumentationLabels.createOperation.amountParamDescription,
    example: 10000,
    type: 'number',
    required: true,
  })
  @IsNumber({}, { message: paymentValidationMessages.createOperation.amountIsNumber })
  @IsNotEmpty({ message: paymentValidationMessages.createOperation.amountRequired })
  @IsPositive({ message: paymentValidationMessages.createOperation.amountIsPositive })
  amount: number;

  @ApiProperty({
    description: paymentDocumentationLabels.createOperation.bankEntityIDParamDescription,
    example: 1,
    type: 'number',
    required: true,
  })
  @IsInt({ message: paymentValidationMessages.createOperation.bankEntityIdIsInt })
  @IsNotEmpty({ message: paymentValidationMessages.createOperation.bankEntityIdRequired })
  bank_entity_id: number;
}
