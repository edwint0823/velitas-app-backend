import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { bagInventoryMovementDocumentationLabels, commonStatusErrorMessages } from '../../../../core/constants';
import { ListBagInventoryMovementDto } from '../model/ListBagInventoryMovement.dto';
import { BagInventoryMovementService } from '../../domain/inboundPorts/BagInventoryMovement.service';

@ApiTags('bag_inventory_movements')
@ApiBearerAuth()
@Controller('bag_inventory_movements')
export class BagInventoryMovementController {
  constructor(private readonly bagInventoryMovementService: BagInventoryMovementService) {}

  @Get('/list/:page_size/:page_number')
  @ApiOperation({ summary: bagInventoryMovementDocumentationLabels.listOperation.summary })
  @ApiResponse({ status: 200, description: bagInventoryMovementDocumentationLabels.listOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'page_size',
    description: bagInventoryMovementDocumentationLabels.listOperation.pageSizeParamDescription,
    required: true,
    type: 'number',
    example: 10,
  })
  @ApiParam({
    name: 'page_number',
    description: bagInventoryMovementDocumentationLabels.listOperation.pageNumberParamDescription,
    required: true,
    type: 'number',
    example: 1,
  })
  @ApiParam({
    name: 'bag_id',
    description: bagInventoryMovementDocumentationLabels.listOperation.bagIdParamDescription,
    required: false,
    type: 'number',
    example: 1,
  })
  @ApiParam({
    name: 'entry_movement',
    description: bagInventoryMovementDocumentationLabels.listOperation.entryMovementParamDescription,
    required: false,
    type: 'boolean',
    example: false,
  })
  @ApiParam({
    name: 'out_movement',
    description: bagInventoryMovementDocumentationLabels.listOperation.outMovementParamDescription,
    required: false,
    type: 'boolean',
    example: false,
  })
  @ApiParam({
    name: 'created_at_begin',
    description: bagInventoryMovementDocumentationLabels.listOperation.createdAtBeginParamDescription,
    required: false,
    type: 'string',
    example: '2024-01-01',
  })
  @ApiParam({
    name: 'created_at_end',
    description: bagInventoryMovementDocumentationLabels.listOperation.createdAtEndParamDescription,
    required: false,
    type: 'string',
    example: '2024-06-01',
  })
  @ApiParam({
    name: 'created_by_name',
    description: bagInventoryMovementDocumentationLabels.listOperation.createdByNameParamDescription,
    required: false,
    type: 'string',
    example: 'Edwin',
  })
  async listBagInventoryMovements(
    @Param('page_size') pageSize: number,
    @Param('page_number') pageNumber: number,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query?: ListBagInventoryMovementDto,
  ) {
    return await this.bagInventoryMovementService.listBagInventoryMovements(pageSize, pageNumber, query);
  }
}
