import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BagService } from '../../domain/inboundPorts/Bag.service';

@ApiTags('bag')
@Controller('bag')
export class BagController {
  constructor(private readonly bagService: BagService) {}

  @Get('/')
  @ApiOperation({
    summary: 'Listar las bolsas disponibles',
  })
  @ApiResponse({ status: 200, description: 'Listado de bolsas' })
  @ApiResponse({ status: 400, description: 'Error de validación de campos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async findAllAvailableInventory() {
    return this.bagService.getBagsAvailable();
  }
}
