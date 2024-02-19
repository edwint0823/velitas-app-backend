import { Controller, Get, Param } from '@nestjs/common';
import { ConfigurationService } from '../../domain/inboundPorts/Configuration.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { findParamByNameDomain } from '../../domain/model/findParamByNameDomain';

@ApiTags('configuration')
@Controller('configuration')
export class ConfigurationController {
  constructor(private readonly configurationService: ConfigurationService) {}

  @Get('/find/:param_name')
  @ApiOperation({
    summary: 'Buscar el valor de un parámetro por el nombre del mismo',
  })
  @ApiResponse({ status: 200, description: 'Valor del parámetro encontrado' })
  @ApiResponse({ status: 400, description: 'Error de validación de campos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @ApiParam({
    name: 'param_name',
    description: 'nombre del parámetro ',
    required: true,
    type: 'string',
    example: 'minimum_size_bulk_price',
  })
  async findParamByName(
    @Param('param_name') param_name: string,
  ): Promise<findParamByNameDomain> {
    return await this.configurationService.findParamByName(param_name);
  }
}
