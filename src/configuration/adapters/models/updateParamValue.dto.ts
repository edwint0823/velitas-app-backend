import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { configurationDocumentationLabels, configurationValidationMessages } from '../../../../core/constants';

export class UpdateParamValueDto {
  @ApiProperty({
    description: configurationDocumentationLabels.updateParamValueOperation.valueParamDescription,
    type: 'string',
    required: true,
    example: '10',
  })
  @IsNotEmpty({ message: configurationValidationMessages.updateParamValueOperation.valueRequired })
  @IsString({ message: configurationValidationMessages.updateParamValueOperation.valueIsString })
  value: string;
}
