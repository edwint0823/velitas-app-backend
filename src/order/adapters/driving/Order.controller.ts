import { Body, Controller, Get, Param, Patch, Post, Put, Query, Res, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { createOrderDto } from '../model/orderCreate.dto';
import { OrderService } from '../../domain/inboundPorts/Order.service';
import { QueryParamsListOrderDto } from '../model/queryParamsListOrder.dto';
import { commonStatusErrorMessages, IAuthUser, orderDocumentationLabels } from '../../../../core/constants';
import { OrderUpdateDto } from '../model/orderUpdate.dto';

@ApiTags('order')
@ApiBearerAuth()
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('/create')
  @ApiOperation({ summary: orderDocumentationLabels.createOperation.summary })
  @ApiResponse({ status: 201, description: orderDocumentationLabels.createOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  async createOrder(@Body() orderData: createOrderDto) {
    return await this.orderService.create(orderData);
  }

  @Get('/find_by_code/:code')
  @ApiOperation({
    summary: orderDocumentationLabels.findByCodeOperation.summary,
  })
  @ApiResponse({ status: 200, description: orderDocumentationLabels.findByCodeOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'code',
    description: orderDocumentationLabels.findByCodeOperation.codeParamDescription,
    required: true,
    type: 'string',
    example: '123456',
  })
  async findOrderByCode(@Param('code') code: string) {
    return await this.orderService.findByCode(code);
  }

  @Get('/paginate_list/:page_size/:page_number')
  @ApiOperation({
    summary: orderDocumentationLabels.paginateListOperation.summary,
  })
  @ApiResponse({ status: 200, description: orderDocumentationLabels.paginateListOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'page_size',
    description: orderDocumentationLabels.paginateListOperation.pageSizeParamDescription,
    required: true,
    type: 'number',
    example: 10,
  })
  @ApiParam({
    name: 'page_number',
    description: orderDocumentationLabels.paginateListOperation.pageNumberParamDescription,
    required: true,
    type: 'number',
    example: 1,
  })
  @ApiQuery({
    name: 'orders_code',
    description: orderDocumentationLabels.paginateListOperation.ordersCodeParamDescription,
    required: false,
    example: '123456,122334',
    type: 'string',
  })
  @ApiQuery({
    name: 'delivery_date_begin',
    description: orderDocumentationLabels.paginateListOperation.deliveryDateBeginParamDescription,
    required: false,
    type: 'string',
    example: '2024-03-23',
  })
  @ApiQuery({
    name: 'delivery_date_end',
    description: orderDocumentationLabels.paginateListOperation.deliveryDateEndParamDescription,
    required: false,
    type: 'string',
    example: '2024-03-24',
  })
  @ApiQuery({
    name: 'created_at_begin',
    description: orderDocumentationLabels.paginateListOperation.createAtBeginParamDescription,
    required: false,
    type: 'date',
    example: '2024-03-23',
  })
  @ApiQuery({
    name: 'created_at_end',
    description: orderDocumentationLabels.paginateListOperation.createdAtEndParamDescription,
    required: false,
    type: 'date',
    example: '2024-03-23',
  })
  @ApiQuery({
    name: 'customer_name',
    description: orderDocumentationLabels.paginateListOperation.customerNameParamDescription,
    required: false,
    example: 'EDWIN',
    type: 'string',
  })
  @ApiQuery({
    name: 'status',
    description: orderDocumentationLabels.paginateListOperation.customerNameParamDescription,
    required: false,
    example: 1,
    type: 'number',
  })
  @ApiQuery({
    name: 'candle_name',
    description: orderDocumentationLabels.paginateListOperation.customerNameParamDescription,
    required: false,
    example: 'Leonor',
    type: 'string',
  })
  async paginateListOrders(
    @Param('page_size') pageSize: number,
    @Param('page_number') pageNumber: number,
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        forbidNonWhitelisted: true,
      }),
    )
    query?: QueryParamsListOrderDto,
  ) {
    return await this.orderService.getPaginateListOrders(pageSize, pageNumber, query);
  }

  @Patch('/update_status/:order_code/:new_status_id')
  @ApiOperation({ summary: orderDocumentationLabels.updateStatusOperation.summary })
  @ApiResponse({ status: 200, description: orderDocumentationLabels.updateStatusOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'order_code',
    description: orderDocumentationLabels.updateStatusOperation.orderCodeParamDescription,
    required: true,
    type: 'string',
    example: '1234568',
  })
  @ApiParam({
    name: 'new_status_id',
    description: orderDocumentationLabels.updateStatusOperation.newStatusIdParamDescription,
    required: true,
    type: 'number',
    example: 3,
  })
  async updateOrderStatus(
    @Param('order_code') order_code: string,
    @Param('new_status_id') newStatusId: number,
    @Query('user') user: IAuthUser,
  ) {
    return await this.orderService.updateOrderStatus(order_code, newStatusId, user);
  }

  @Put('/update_order_and_details/:order_code')
  @ApiOperation({ summary: orderDocumentationLabels.updateOrderAndDetailOperation.summary })
  @ApiResponse({ status: 200, description: orderDocumentationLabels.updateOrderAndDetailOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'order_code',
    description: orderDocumentationLabels.updateOrderAndDetailOperation.orderCodeParamDescription,
    required: true,
    type: 'string',
    example: '1234568',
  })
  async updateOrderAndDetails(
    @Param('order_code') orderCode: string,
    @Body() orderData: OrderUpdateDto,
    @Query('user') user: IAuthUser,
  ) {
    return await this.orderService.updateOrderAndDetail(orderCode, orderData, user);
  }

  @Get('/get_details_and_bags/:order_code')
  @ApiOperation({ summary: orderDocumentationLabels.getOrderDetailsAndBagsOperation.summary })
  @ApiResponse({ status: 200, description: orderDocumentationLabels.getOrderDetailsAndBagsOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'order_code',
    description: orderDocumentationLabels.getOrderDetailsAndBagsOperation.orderCodeParamDescription,
    required: true,
    type: 'string',
    example: '1234568',
  })
  async getOrderDeTailsAndBags(@Param('order_code') orderCode: string) {
    return this.orderService.getOrderDetailsAndBagsByCode(orderCode);
  }

  @Get('/edit_order/:order_code')
  @ApiOperation({ summary: orderDocumentationLabels.editOrderAndDetailsOperations.summary })
  @ApiResponse({ status: 200, description: orderDocumentationLabels.editOrderAndDetailsOperations.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 401, description: commonStatusErrorMessages.unauthorizedErrorMessage })
  @ApiResponse({ status: 403, description: commonStatusErrorMessages.forbiddenErrorMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'order_code',
    description: orderDocumentationLabels.editOrderAndDetailsOperations.orderCodeParamDescription,
    required: true,
    type: 'string',
    example: '1234568',
  })
  async editOrderAndDetails(@Param('order_code') orderCode: string) {
    return this.orderService.editOrderByCode(orderCode);
  }

  @Get('export_to_excel/:order_code')
  @ApiOperation({ summary: orderDocumentationLabels.exportExcelOperation.summary })
  @ApiResponse({ status: 200, description: orderDocumentationLabels.exportExcelOperation.success })
  @ApiResponse({ status: 400, description: commonStatusErrorMessages.badRequestMessage })
  @ApiResponse({ status: 500, description: commonStatusErrorMessages.internalServerErrorMessage })
  @ApiParam({
    name: 'order_code',
    description: orderDocumentationLabels.exportExcelOperation.orderCodeParamDescription,
    required: true,
    type: 'string',
    example: '1234568',
  })
  async exportOrderToExcel(@Param('order_code') orderCode: string, @Res() res: Response) {
    const { buffer, fileName } = await this.orderService.exportOrderToExcel(orderCode);
    res.header('Content-disposition', `attachment; filename=${fileName}.xlsx`);
    res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return res.send(buffer);
  }
}
