import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { CandleOptionService } from '../../domain/inboundPorts/CandleOption.service';

@ApiTags('candle_options')
@Controller('candle_options')
export class CandleOptionController {
  constructor(private readonly candleOptionService: CandleOptionService) {}

  @Get('/candle_options_with_min_items')
  @ApiOperation({
    summary:
      'Optener listado de opciones de vela junto con la cantidad minima de items para usar precio mayorista',
  })
  @ApiResponse({ status: 200, description: 'Listado de velas' })
  @ApiResponse({ status: 400, description: 'Error de validación de campos' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async getCandleOptionAndMinItemsBulkPrice() {
    return this.candleOptionService.getCandleOptionAndMinItemsBulkPrice();
  }
}
