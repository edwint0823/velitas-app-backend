import { Controller, Get, Param } from '@nestjs/common';
import { ConfigurationService } from '../../domain/inboundPorts/Configuration.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { findParamByNameDomain } from '../../domain/model/findParamByNameDomain';
import { commonStatusErrorMessages, configurationDocumentationLabels } from '../../../../core/constants';

@ApiTags('configuration')
@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get('/find/:param_name')
  @ApiOperation({
    summary: configurationDocumentationLabels.findOperation.summary,
  })
  @ApiResponse({ status: 200, description: configurationDocumentationLabels.findOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'param_name',
    description: configurationDocumentationLabels.findOperation.paramNameDescription,
    required: true,
    type: 'string',
    example: 'minimum_size_bulk_price',
  })
  async findParamByName(@Param('param_name') param_name: string): Promise<findParamByNameDomain> {
    return await this.configurationService.findParamByName(param_name);
  }
}
