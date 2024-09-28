import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ConfigurationService } from '../../domain/inboundPorts/Configuration.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { findParamByNameDomain } from '../../domain/model/out/findParamByNameDomain';
import { commonStatusErrorMessages, configurationDocumentationLabels } from '../../../../core/constants';
import { ListParamsDomain } from '../../domain/model/out/listParamsDomain';
import { UpdateParamValueDto } from '../models/updateParamValue.dto';

@ApiTags('configuration')
@ApiBearerAuth()
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

  @Get('/list')
  @ApiOperation({
    summary: configurationDocumentationLabels.listOperation.summary,
  })
  @ApiResponse({ status: 200, description: configurationDocumentationLabels.listOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  async listAllParams(): Promise<ListParamsDomain[]> {
    return await this.configurationService.listAllParams();
  }

  @Patch('/update/:id')
  @ApiOperation({ summary: configurationDocumentationLabels.updateParamValueOperation.summary })
  @ApiResponse({ status: 200, description: configurationDocumentationLabels.updateParamValueOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'id',
    description: configurationDocumentationLabels.updateParamValueOperation.idParamDescription,
    required: true,
    type: 'number',
    example: 1,
  })
  async updateParamValueById(@Param('id') id: number, @Body() body: UpdateParamValueDto) {
    return await this.configurationService.updateParamValueById(id, body);
  }
}
