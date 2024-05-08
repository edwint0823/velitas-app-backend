import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch, Query, ValidationPipe } from '@nestjs/common';
import { candleInventoryDocumentationLabels, commonStatusErrorMessages, IAuthUser } from '../../../../core/constants';
import { UpdateCandleInventoryQuantityDto } from '../model/updateCandleInventoryQuantity.dto';
import { CandleInventoryService } from '../../domain/inboundPorts/CandleInventory.service';
import { ListCandleInventoryDto } from '../model/listCandleInventory.dto';

@ApiTags('candle_inventory')
@ApiBearerAuth()
@Controller('candle_inventory')
export class CandleInventoryController {
  constructor(private readonly candleInventoryService: CandleInventoryService) {}

  @Patch('/update_quantity/:candle_type_id')
  @ApiOperation({ summary: candleInventoryDocumentationLabels.addOrRemoveInventoryOperation.summary })
  @ApiResponse({ status: 200, description: candleInventoryDocumentationLabels.addOrRemoveInventoryOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'candle_type_id',
    description: candleInventoryDocumentationLabels.addOrRemoveInventoryOperation.candleTypeIdParamDescription,
    required: true,
    type: 'number',
    example: 1,
  })
  async addOrRemoveInventory(
    @Param('candle_type_id') candleTypeId: number,
    @Body() inventoryInfo: UpdateCandleInventoryQuantityDto,
    @Query('user') user: IAuthUser,
  ) {
    return await this.candleInventoryService.addOrRemoveCandleInventory(candleTypeId, inventoryInfo, user);
  }

  @Get('/list')
  @ApiOperation({ summary: candleInventoryDocumentationLabels.listOperation.summary })
  @ApiResponse({ status: 200, description: candleInventoryDocumentationLabels.listOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiQuery({
    name: 'name',
    description: candleInventoryDocumentationLabels.listOperation.nameParamDescription,
    required: false,
    type: 'string',
    example: 'Vela blanca',
  })
  async listCandleInventory(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query: ListCandleInventoryDto,
  ) {
    return await this.candleInventoryService.listInventory(query);
  }
}
