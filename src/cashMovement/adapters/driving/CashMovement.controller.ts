import { CashMovementService } from '../../domain/inboundPorts/CashMovement.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { cashMovementsDocumentationsLabels, commonStatusErrorMessages } from '../../../../core/constants';
import { ListCashMovementDto } from '../model/listCashMovement.dto';

@ApiTags('cash_movements')
@ApiBearerAuth()
@Controller('cash_movements')
export class CashMovementController {
  constructor(private readonly cashMovementService: CashMovementService) {}

  @Get('/list/:page_size/:page_number')
  @ApiOperation({ summary: cashMovementsDocumentationsLabels.listAllOperations.summary })
  @ApiResponse({ status: 200, description: cashMovementsDocumentationsLabels.listAllOperations.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'page_size',
    description: cashMovementsDocumentationsLabels.listAllOperations.pageSizeParamDescription,
    required: true,
    type: 'number',
    example: 10,
  })
  @ApiParam({
    name: 'page_number',
    description: cashMovementsDocumentationsLabels.listAllOperations.pageNumberParamDescription,
    required: true,
    type: 'number',
    example: 1,
  })
  @ApiQuery({
    name: 'entry_movement',
    description: cashMovementsDocumentationsLabels.listAllOperations.entryMovementParamDescription,
    required: false,
    example: false,
    type: 'boolean',
  })
  @ApiQuery({
    name: 'out_movement',
    description: cashMovementsDocumentationsLabels.listAllOperations.outMovementParamDescription,
    required: false,
    example: false,
    type: 'boolean',
  })
  @ApiQuery({
    name: 'bank_entity',
    description: cashMovementsDocumentationsLabels.listAllOperations.bankEntityIdParamDescription,
    required: false,
    example: undefined,
    type: 'number',
  })
  @ApiQuery({
    name: 'created_at_begin',
    description: cashMovementsDocumentationsLabels.listAllOperations.createdAtBeginParamDescription,
    required: false,
    example: '2024-01-01',
    type: 'string',
  })
  @ApiQuery({
    name: 'created_at_end',
    description: cashMovementsDocumentationsLabels.listAllOperations.createdAtEndParamDescription,
    required: false,
    example: '2024-06-01',
    type: 'string',
  })
  @ApiQuery({
    name: 'orders_code',
    description: cashMovementsDocumentationsLabels.listAllOperations.ordersCodeParamDescription,
    required: false,
    example: '123456,654321',
    type: 'string',
  })
  async listAllCashMovement(
    @Param('page_size') pageSize: number,
    @Param('page_number') pageNumber: number,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query?: ListCashMovementDto,
  ) {
    return this.cashMovementService.listAllCashMovements(pageSize, pageNumber, query);
  }
}
