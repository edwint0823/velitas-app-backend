import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Get, Param, Patch, Query, ValidationPipe } from '@nestjs/common';
import { CashInventoryService } from '../../domain/inboundPorts/CashInventory.service';
import { cashInventoryDocumentationLabels, commonStatusErrorMessages } from '../../../../core/constants';
import { QueryDataListInventoryDto } from '../model/queryDataListInventory.dto';
import { UpdateQuantityToCashInventoryDto } from '../model/updateQuantityToCashInventory.dto';

@ApiTags('cash_inventory')
@ApiBearerAuth()
@Controller('cash_inventory')
export class CashInventoryController {
  constructor(private readonly cashInventoryService: CashInventoryService) {}

  @Get('/list')
  @ApiOperation({ summary: cashInventoryDocumentationLabels.listOperation.summary })
  @ApiResponse({ status: 200, description: cashInventoryDocumentationLabels.listOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiQuery({
    name: 'name',
    description: cashInventoryDocumentationLabels.listOperation.nameParamDescription,
    required: false,
    type: 'string',
    example: 'Billete de 100',
  })
  async listCashInventory(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query?: QueryDataListInventoryDto,
  ) {
    return await this.cashInventoryService.listCashInventory(query);
  }

  @Get('/find_item/:id')
  @ApiOperation({ summary: cashInventoryDocumentationLabels.findOperation.summary })
  @ApiResponse({ status: 200, description: cashInventoryDocumentationLabels.findOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'id',
    description: cashInventoryDocumentationLabels.findOperation.idParamDescription,
    required: false,
    type: 'number',
    example: 1,
  })
  async findCashInventory(@Param('id') id: number) {
    return await this.cashInventoryService.findCashInventoryById(id);
  }

  @Patch('/update_quantity/:id')
  @ApiOperation({ summary: cashInventoryDocumentationLabels.updateQuantityOperation.summary })
  @ApiResponse({ status: 200, description: cashInventoryDocumentationLabels.updateQuantityOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'id',
    description: cashInventoryDocumentationLabels.updateQuantityOperation.idParamDescription,
    required: false,
    type: 'number',
    example: 1,
  })
  async updateQuantity(@Param('id') id: number, @Body() body: UpdateQuantityToCashInventoryDto) {
    return await this.cashInventoryService.updateQuantityToCashInventory(id, body);
  }
}
