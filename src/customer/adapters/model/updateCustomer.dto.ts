import { ApiProperty } from '@nestjs/swagger';
import { customerDocumentationLabels, customerValidationMessages, priceTypeOptions } from '../../../../core/constants';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateCustomerDto {
  @ApiProperty({
    example: 'EDWIN TOBIAS ARIZA TELLEZ',
    description: customerDocumentationLabels.updateCustomerOperation.nameParamDescription,
    required: true,
  })
  @IsString({
    message: customerValidationMessages.updateCustomerOperation.nameIsString,
  })
  @IsNotEmpty({
    message: customerValidationMessages.updateCustomerOperation.nameRequired,
  })
  @Transform(({ value }) => value.toUpperCase())
  name: string;

  @ApiProperty({
    example: '315 250 2320',
    description: customerDocumentationLabels.updateCustomerOperation.phoneParamDescription,
    required: true,
  })
  @IsNotEmpty({
    message: customerValidationMessages.updateCustomerOperation.phoneRequired,
  })
  @IsString({
    message: customerValidationMessages.updateCustomerOperation.phoneIsString,
  })
  phone_number: string;

  @ApiProperty({
    example: 'detal',
    description: customerDocumentationLabels.updateCustomerOperation.priceTypeParamDescription,
    required: true,
    enum: priceTypeOptions,
  })
  @IsIn(priceTypeOptions, {
    message: `${customerValidationMessages.updateCustomerOperation.priceTypeIn} ${priceTypeOptions.join(', ')}`,
  })
  price_type: string;
}
