import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { CandleInventoryMovementService } from '../../domain/inboundPorts/CandleInventoryMovement.service';
import { candleInventoryMovementDocumentationLabels, commonStatusErrorMessages } from '../../../../core/constants';
import { ListCandleInventoryMovementDto } from '../model/ListCandleInventoryMovement.dto';

@ApiTags('candle_inventory_movements')
@ApiBearerAuth()
@Controller('candle_inventory_movements')
export class CandleInventoryMovementController {
  constructor(private readonly candleInventoryMovementService: CandleInventoryMovementService) {}

  @Get('/list/:page_size/:page_number')
  @ApiOperation({ summary: candleInventoryMovementDocumentationLabels.listOperation.summary })
  @ApiResponse({ status: 200, description: candleInventoryMovementDocumentationLabels.listOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'page_size',
    description: candleInventoryMovementDocumentationLabels.listOperation.pageSizeParamDescription,
    required: true,
    type: 'number',
    example: 10,
  })
  @ApiParam({
    name: 'page_number',
    description: candleInventoryMovementDocumentationLabels.listOperation.pageNumberParamDescription,
    required: true,
    type: 'number',
    example: 1,
  })
  @ApiParam({
    name: 'candle_type_id',
    description: candleInventoryMovementDocumentationLabels.listOperation.candleTypeIdParamDescription,
    required: false,
    type: 'number',
    example: 1,
  })
  @ApiParam({
    name: 'entry_movement',
    description: candleInventoryMovementDocumentationLabels.listOperation.entryMovementParamDescription,
    required: false,
    type: 'boolean',
    example: false,
  })
  @ApiParam({
    name: 'out_movement',
    description: candleInventoryMovementDocumentationLabels.listOperation.outMovementParamDescription,
    required: false,
    type: 'boolean',
    example: false,
  })
  @ApiParam({
    name: 'created_at_begin',
    description: candleInventoryMovementDocumentationLabels.listOperation.createdAtBeginParamDescription,
    required: false,
    type: 'string',
    example: '2024-01-01',
  })
  @ApiParam({
    name: 'created_at_end',
    description: candleInventoryMovementDocumentationLabels.listOperation.createdAtEndParamDescription,
    required: false,
    type: 'string',
    example: '2024-06-01',
  })
  @ApiParam({
    name: 'created_by_name',
    description: candleInventoryMovementDocumentationLabels.listOperation.createdByNameParamDescription,
    required: false,
    type: 'string',
    example: 'Edwin',
  })
  async listCandleInventoryMovements(
    @Param('page_size') pageSize: number,
    @Param('page_number') pageNumber: number,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query?: ListCandleInventoryMovementDto,
  ) {
    return await this.candleInventoryMovementService.listCandleInventoryMovements(pageSize, pageNumber, query);
  }
}
