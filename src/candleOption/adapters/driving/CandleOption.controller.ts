import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { CandleOptionService } from '../../domain/inboundPorts/CandleOption.service';
import { candleOptionDocumentationLabels, commonStatusErrorMessages } from '../../../../core/constants';

@ApiTags('candle_options')
@Controller('candle_options')
export class CandleOptionController {
  constructor(private readonly candleOptionService: CandleOptionService) {}

  @Get('/candle_options_with_min_items')
  @ApiOperation({
    summary: candleOptionDocumentationLabels.listOperation.summary,
  })
  @ApiResponse({ status: 200, description: candleOptionDocumentationLabels.listOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  async getCandleOptionAndMinItemsBulkPrice() {
    return this.candleOptionService.getCandleOptionAndMinItemsBulkPrice();
  }
}
