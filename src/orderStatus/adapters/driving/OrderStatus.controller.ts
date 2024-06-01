import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { OrderStatusService } from '../../domain/inboundPorts/OrderStatus.service';
import { commonStatusErrorMessages, orderStatusChangeLogsDocumentationLabels } from '../../../../core/constants';
import { ListOrderStatusChangeLogsDto } from '../model/ListOrderStatusChangeLogs.dto';

@ApiTags('order_status_change_logs')
@ApiBearerAuth()
@Controller('order_status_change_logs')
export class OrderStatusController {
  constructor(private readonly orderStatusService: OrderStatusService) {}

  @Get('/list/:page_size/:page_number')
  @ApiOperation({ summary: orderStatusChangeLogsDocumentationLabels.listOperation.summary })
  @ApiResponse({ status: 200, description: orderStatusChangeLogsDocumentationLabels.listOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'page_size',
    description: orderStatusChangeLogsDocumentationLabels.listOperation.pageSizeParamDescription,
    required: true,
    type: 'number',
    example: 10,
  })
  @ApiParam({
    name: 'page_number',
    description: orderStatusChangeLogsDocumentationLabels.listOperation.pageNumberParamDescription,
    required: true,
    type: 'number',
    example: 1,
  })
  @ApiParam({
    name: 'order_code',
    description: orderStatusChangeLogsDocumentationLabels.listOperation.orderCodeParamDescription,
    required: false,
    type: 'string',
    example: '782486',
  })
  @ApiParam({
    name: 'created_at_begin',
    description: orderStatusChangeLogsDocumentationLabels.listOperation.createdAtBeginParamDescription,
    required: false,
    type: 'string',
    example: '2024-01-01',
  })
  @ApiParam({
    name: 'created_at_end',
    description: orderStatusChangeLogsDocumentationLabels.listOperation.createdAtEndParamDescription,
    required: false,
    type: 'string',
    example: '2024-06-01',
  })
  @ApiParam({
    name: 'created_by_name',
    description: orderStatusChangeLogsDocumentationLabels.listOperation.createdByNameParamDescription,
    required: false,
    type: 'string',
    example: 'Edwin',
  })
  async listOrderStatusChangeLogs(
    @Param('page_size') pageSize: number,
    @Param('page_number') pageNumber: number,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query?: ListOrderStatusChangeLogsDto,
  ) {
    return await this.orderStatusService.listOrderStatusChangeLogs(pageSize, pageNumber, query);
  }
}
