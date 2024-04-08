import { StatusService } from '../../domain/inboundPorts/Status.service';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';

@ApiTags('status')
@ApiBearerAuth()
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Get('/list_status/:order')
  @ApiResponse({ status: 200, description: 'Listado de status con orden mayor o igual a la dispuesta' })
  @ApiResponse({ status: 400, description: 'Error de validación de campos' })
  @ApiResponse({ status: 401, description: 'Usuario no autorizado' })
  @ApiResponse({ status: 403, description: 'No tiene permiso para realizar la acción' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  @ApiParam({
    name: 'order',
    description: 'orden del status',
    required: true,
    type: 'number',
    example: 2,
  })
  async listStatus(@Param('order') order: number) {
    return this.statusService.statusList(order);
  }
}
