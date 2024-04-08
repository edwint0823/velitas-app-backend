import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsIn, IsString } from 'class-validator';
import { customerDocumentationLabels, customerValidationMessages, priceTypeOptions } from '../../../../core/constants';

export class createCustomerDto {
  @ApiProperty({
    example: 'example@example.com',
    description: customerDocumentationLabels.createOperation.emailParamDescription,
    required: true,
  })
  @IsString({
    message: customerValidationMessages.createOperation.emailIsString,
  })
  @IsNotEmpty({
    message: customerValidationMessages.createOperation.emailRequired,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'EDWIN TOBIAS ARIZA TELLEZ',
    description: customerDocumentationLabels.createOperation.nameParamDescription,
    required: true,
  })
  @IsString({
    message: customerValidationMessages.createOperation.nameIsString,
  })
  @IsNotEmpty({
    message: customerValidationMessages.createOperation.nameRequired,
  })
  name: string;

  @ApiProperty({
    example: '315 250 2320',
    description: customerDocumentationLabels.createOperation.phoneParamDescription,
    required: true,
  })
  @IsNotEmpty({
    message: customerValidationMessages.createOperation.phoneRequired,
  })
  phone_number: string;

  @ApiProperty({
    example: 'detal',
    description: customerDocumentationLabels.createOperation.priceTypeParamDescription,
    required: true,
    enum: priceTypeOptions,
  })
  @IsIn(priceTypeOptions, {
    message: `${customerValidationMessages.createOperation.priceTypeIn} ${priceTypeOptions.join(', ')}`,
  })
  price_type: string;
}
