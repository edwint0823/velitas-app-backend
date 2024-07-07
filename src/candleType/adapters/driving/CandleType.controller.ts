import { CandleTypeService } from '../../domain/inboundPorts/CandleType.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { candleTypeDocumentationLabels, commonStatusErrorMessages } from '../../../../core/constants';

@ApiTags('candle_type')
@ApiBearerAuth()
@Controller('candle_type')
export class CandleTypeController {
  constructor(private readonly candleTypeService: CandleTypeService) {}

  @Get('/list')
  @ApiOperation({ summary: candleTypeDocumentationLabels.listOperation.summary })
  @ApiResponse({ status: 200, description: candleTypeDocumentationLabels.listOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  async listCandleTypes() {
    return await this.candleTypeService.listCandleTypes();
  }

  @Get('/candle_options_with_min_items')
  @ApiOperation({
    summary: candleTypeDocumentationLabels.listTypesWithOptionsOperations.summary,
  })
  @ApiResponse({ status: 200, description: candleTypeDocumentationLabels.listTypesWithOptionsOperations.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  async getCandleOptionAndMinItemsBulkPrice() {
    return this.candleTypeService.getCandleOptionAndMinItemsBulkPrice();
  }
}
